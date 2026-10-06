<?php

declare(strict_types=1);

// Isolated fixtures prove that loading needs only JSON and file stats, never EXIF decoding.
require_once __DIR__ . '/../../public/scripts/photography/catalog.php';

function check(bool $condition, string $message): void
{
    if (! $condition) {
        throw new RuntimeException($message);
    }
}

$root = sys_get_temp_dir() . '/photography-test-' . bin2hex(random_bytes(8));
mkdir($root);
mkdir($root . '/portraiture');
mkdir($root . '/portraiture/previews');
mkdir($root . '/2026_japan_trip');
$files = [
    '/portraiture/sample.jpg', '/portraiture/second.jpg', '/portraiture/sample.json', '/portraiture/second.json',
    '/portraiture/previews/preview-sample.webp', '/portraiture/previews/sample.json', '/2026_japan_trip/unfinished.jpg',
];
register_shutdown_function(static function () use ($root, $files): void {
    foreach ($files as $file) {
        if (is_file($root . $file)) unlink($root . $file);
    }
    foreach (['/portraiture/previews', '/portraiture', '/2026_japan_trip', ''] as $directory) rmdir($root . $directory);
});
$configuration = [
    'portraiture' => ['title' => 'Portraiture', 'status' => 'published'],
    '2026_japan_trip' => ['title' => 'Japan Trip', 'status' => 'coming-soon'],
];
foreach (['/portraiture/sample.jpg', '/portraiture/second.jpg', '/portraiture/previews/preview-sample.webp', '/2026_japan_trip/unfinished.jpg'] as $file) {
    file_put_contents($root . $file, 'fixture');
}
$data = [
    'filename' => 'sample.jpg', 'preview_filename' => 'previews/preview-sample.webp',
    'title' => 'Sample', 'alt' => 'A descriptive photograph', 'description' => 'Description', 'weighting' => 9,
    'metadata' => ['image' => ['width' => 640, 'height' => 480], 'capture' => ['camera' => 'Canon EOS R5', 'max_aperture_apex' => 3, 'gps' => 'private']],
    'source' => ['internal' => 'not public'],
];
$sidecar = $root . '/portraiture/sample.json';
file_put_contents($sidecar, json_encode($data));
file_put_contents($root . '/portraiture/second.json', json_encode(array_replace($data, ['filename' => 'second.jpg', 'preview_filename' => null, 'weighting' => 0])));
file_put_contents($root . '/portraiture/previews/sample.json', '{}');
$gallery = Photography\loadGallery($root, $configuration);
check(count($gallery['photos']) === 2, 'Previews and coming-soon photos must not become gallery records.');
check($gallery['photos'][0]['filename'] === 'sample.jpg', 'Higher weighting sorts first.');
check($gallery['photos'][0]['preview_filename'] === 'previews/preview-sample.webp', 'Valid preview is explicit.');
check(Photography\record($root . '/portraiture', 'sample.jpg', '/portfolio/photography/portraiture/', 'portraiture', 'Portraiture') === $gallery['photos'][0], 'Standalone and gallery records must normalize the same sidecar identically.');
check(! isset($gallery['photos'][0]['source']) && ! isset($gallery['photos'][0]['metadata']['capture']['gps']), 'Authoring fingerprints and unneeded metadata are private.');
check($gallery['photos'][0]['metadata']['capture']['f_stop'] === null, 'Missing metadata is null.');
check($gallery['photos'][0]['metadata']['capture']['camera'] === 'Canon EOS R5', 'Only the clean camera display value is needed.');
check(abs($gallery['photos'][0]['metadata']['capture']['max_aperture_f_stop'] - sqrt(8)) < 0.000001, 'PHP converts EXIF APEX to the displayed maximum f-number.');
check(! array_key_exists('max_aperture_apex', $gallery['photos'][0]['metadata']['capture']), 'Do not duplicate the raw aperture in the viewer response.');
foreach ([null, '3', 'invalid', INF, NAN, -21, 41] as $apex) {
    check(Photography\metadata(['capture' => ['max_aperture_apex' => $apex]])['capture']['max_aperture_f_stop'] === null, 'Invalid or missing APEX must stay unknown.');
}
foreach ([0 => 1, 2 => 2, 4 => 4, 6 => 8] as $apex => $fNumber) {
    check((float) Photography\metadata(['capture' => ['max_aperture_apex' => $apex]])['capture']['max_aperture_f_stop'] === (float) $fNumber, 'Known EXIF values convert correctly, including zero.');
}
$invalid = Photography\metadata(['image' => ['width' => 1e100, 'height' => -1], 'file' => 'invalid', 'capture' => ['f_stop' => 'NaN', 'camera' => 'invalid']]);
check($invalid['image']['width'] === null && $invalid['image']['height'] === null && $invalid['capture']['f_stop'] === null, 'Malformed metadata cannot create invalid dimensions or values.');

$oldPreview = $gallery['photos'][0]['preview_src'];
touch($root . '/portraiture/previews/preview-sample.webp', time() + 10);
clearstatcache();
check(Photography\loadGallery($root, $configuration)['photos'][0]['preview_src'] !== $oldPreview, 'Preview edits update asset versions.');
$data['preview_filename'] = null;
file_put_contents($sidecar, json_encode($data));
check(Photography\loadGallery($root, $configuration)['photos'][0]['preview_src'] === null, 'Explicit null must never guess a preview.');
$data['preview_filename'] = '../../outside.webp';
file_put_contents($sidecar, json_encode($data));
check(Photography\loadGallery($root, $configuration)['photos'][0]['preview_src'] === null, 'Traversal paths must fall back safely.');

$data['preview_filename'] = 'previews/preview-sample.webp';
$data['description'] = 'An edited description';
file_put_contents($sidecar, json_encode($data));
check(Photography\loadGallery($root, $configuration)['photos'][0]['description'] === 'An edited description', 'Editorial changes appear without generating a cache.');
unlink($root . '/portraiture/previews/preview-sample.webp');
check(Photography\loadGallery($root, $configuration)['photos'][0]['preview_src'] === null, 'Removed previews fall back to originals.');
file_put_contents($sidecar, '{malformed JSON');
$gallery = Photography\loadGallery($root, $configuration);
check(count($gallery['photos']) === 1, 'Malformed JSON must not corrupt the rest of the gallery.');
file_put_contents($sidecar, json_encode($data));
check(count(Photography\loadGallery($root, $configuration)['photos']) === 2, 'Repairing JSON restores the photo immediately.');
unlink($sidecar);
check(count(Photography\loadGallery($root, $configuration)['photos']) === 1, 'Deleting JSON removes the entry even when its original remains.');
file_put_contents($sidecar, json_encode($data));
unlink($root . '/portraiture/sample.jpg');
check(count(Photography\loadGallery($root, $configuration)['photos']) === 1, 'Deleted originals leave the gallery.');

try {
    Photography\categoryDirectory($root, '../outside');
    throw new RuntimeException('Traversal category was accepted.');
} catch (RuntimeException $exception) {
    check($exception->getMessage() === 'Invalid photography category.', 'Category traversal must be rejected.');
}
fwrite(STDOUT, "Photography catalog checks passed.\n");
