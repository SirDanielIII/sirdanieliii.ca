<?php

declare(strict_types=1);

require_once __DIR__ . '/catalog.php';

$root = dirname(__DIR__, 2);
$temporary = sys_get_temp_dir() . '/portfolio-media-tests-' . bin2hex(random_bytes(8));
mkdir($temporary);
mkdir("$temporary/public");
$videoSource = json_decode((string) file_get_contents("$root/public/portfolio/video/videography.json"), true, 64, JSON_THROW_ON_ERROR);
$filmSource = json_decode((string) file_get_contents("$root/public/portfolio/short_film/short-films.json"), true, 64, JSON_THROW_ON_ERROR);
$checks = 0;

function check(bool $condition, string $message): void
{
    global $checks;
    if (! $condition) throw new RuntimeException($message);
    $checks++;
}

function writeSource(array $videos, array $films): void
{
    global $temporary;
    file_put_contents("$temporary/public/portfolio/video/videography.json", json_encode($videos, JSON_THROW_ON_ERROR));
    file_put_contents("$temporary/public/portfolio/short_film/short-films.json", json_encode($films, JSON_THROW_ON_ERROR));
}

function imageFixture(string $path): void
{
    if (! is_dir(dirname($path))) mkdir(dirname($path), 0777, true);
    // getimagesize inspects actual image headers, without needing a pixels/EXIF dependency.
    file_put_contents($path, base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j5X0AAAAASUVORK5CYII='));
}

function assetFixtures(mixed $source, string $assets): void
{
    if (! is_array($source)) return;
    foreach ($source as $key => $value) {
        if (in_array($key, ['thumbnail', 'logo'], true) && is_string($value)) imageFixture("$assets/$value");
        elseif (in_array($key, ['posters', 'screenshots'], true) && is_array($value)) {
            foreach ($value as $filename) imageFixture("$assets/$filename");
        } elseif ($key === 'screenshotsDirectory') {
            imageFixture("$assets/$value/z-first.png");
            imageFixture("$assets/$value/a-second.png");
            file_put_contents("$assets/$value/ignore.txt", 'not an image');
        } else assetFixtures($value, $assets);
    }
}

function expectFailure(string $name, callable $mutation, string $expected): void
{
    global $videoSource, $filmSource, $temporary;
    $videos = $videoSource;
    $films = $filmSource;
    $mutation($videos, $films);
    writeSource($videos, $films);
    try {
        PortfolioMedia\compile("$temporary/public");
    } catch (RuntimeException $exception) {
        check(str_contains($exception->getMessage(), $expected), "$name produced the wrong error: {$exception->getMessage()}");
        return;
    }
    throw new RuntimeException("$name unexpectedly passed validation");
}

try {
    assetFixtures($videoSource, "$temporary/public/portfolio/video");
    assetFixtures($filmSource, "$temporary/public/portfolio/short_film");
    writeSource($videoSource, $filmSource);
    $data = PortfolioMedia\compile("$temporary/public");
    $sections = $data['videography']['sections'];
    $collections = $data['short-films']['collections'];
    check(array_column($sections, 'slug') === ['youtube-channel', 'springfest', 'commissions', 'studio-q'], 'section order changed');
    check(array_column($sections[0]['items'], 'slug') === ['room-review', 'move-in-vlog'], 'channel order changed');
    check(array_column($sections[1]['items'], 'slug') === ['springfest-2022', 'springfest-2023', 'springfest-2024'], 'Springfest order changed');
    check(array_column($sections[2]['groups'], 'slug') === ['echos-of-my-silence', 'lost-tribe'], 'commission order changed');
    check(array_column($sections[2]['groups'][1]['items'], 'date') === ['2023 Dec', '2021 Dec'], 'trailer order or supplied dates changed');
    check(array_column($sections[2]['groups'][1]['collections'][0]['items'], 'slug') === ['tzedakahthon', 'ukraine-relief', 'valorant-montage', 'multiversus'], 'other projects order changed');
    check(array_column($collections, 'slug') === ['street-drugs', 'filmography'], 'film collection order changed');
    check(array_column($collections[0]['films'], 'slug') === ['street_drugs', 'street_drugs_3'], 'STREET DRUGS order changed');
    check($collections[0]['presentation'] === 'series' && $collections[1]['presentation'] === 'filmography', 'series layout or default filmography layout was lost');
    check(array_column($collections[1]['films'], 'slug') === ['k_town_noir', 'shelter', 'the_bachelorette_party'], 'filmography order changed');
    check($data['short-films']['featuredFilm'] === 'k_town_noir' && is_string($data['short-films']['featuredFilm']), 'featured film must remain a slug reference');
    check(count(array_filter(array_merge(...array_column($collections, 'films')), static fn(array $film): bool => $film['slug'] === 'k_town_noir')) === 1, 'featured metadata was duplicated');
    check($collections[0]['films'][1]['video'] === null && $collections[0]['films'][1]['thumbnail'] === null, 'coming soon requires absent media');
    check($collections[1]['films'][0]['video']['url'] === '/media/k_town_noir/master.m3u8', 'same-site HLS must use the public media path');
    check(str_starts_with($collections[1]['films'][0]['thumbnail']['src'], '/portfolio/short_film/K-Town%20Noir%20%282024%29-'), 'public image URLs must be encoded');
    check($sections[0]['items'][0]['video']['embedUrl'] === 'https://www.youtube-nocookie.com/embed/Qs6sIiztsIQ?autoplay=1&rel=0', 'YouTube URL normalization failed');
    $expectedImages = [];
    foreach (new FilesystemIterator("$temporary/public/portfolio/short_film/screenshots/the_bachelorette_party", FilesystemIterator::SKIP_DOTS) as $file) {
        if ($file->getExtension() === 'png') $expectedImages[] = $file->getFilename();
    }
    $screenshots = $collections[1]['films'][2]['screenshots'];
    check(array_map(static fn(array $image): string => basename((string) parse_url($image['src'], PHP_URL_PATH)), $screenshots) === $expectedImages, 'directory discovery was sorted or unrelated files were included');
    check(count($collections[1]['films'][1]['screenshots']) === 2, 'Shelter screenshot directory was not compiled');
    check($collections[1]['films'][1]['posters'] === [], 'Shelter must support screenshots without posters');

    // Authors can deliberately reverse all source lists; the pipeline must follow them.
    $reordered = $filmSource;
    $reordered['collections'][1]['films'] = array_reverse($reordered['collections'][1]['films']);
    $reordered['collections'][1]['films'][0]['posters'] = array_reverse($reordered['collections'][1]['films'][0]['posters']);
    writeSource($videoSource, $reordered);
    $changed = PortfolioMedia\compile("$temporary/public");
    check(array_column($changed['short-films']['collections'][1]['films'], 'slug') === ['the_bachelorette_party', 'shelter', 'k_town_noir'], 'source edits did not change film order');
    check(str_contains($changed['short-films']['collections'][1]['films'][0]['posters'][0]['src'], '%28BTS%29'), 'poster array order changed');
    $optional = $filmSource;
    foreach (['video', 'thumbnail', 'posters', 'synopsis', 'funFact'] as $field) unset($optional['collections'][1]['films'][1][$field]);
    writeSource($videoSource, $optional);
    $without = PortfolioMedia\compile("$temporary/public");
    check($without['short-films']['collections'][1]['films'][1]['video'] === null, 'optional media must normalize to null');
    check($without['short-films']['collections'][1]['films'][1]['posters'] === [], 'optional galleries must normalize to arrays');

    expectFailure('missing slug', static function (&$v, &$f) { unset($f['collections'][1]['films'][0]['slug']); }, 'slug: a nonempty string is required');
    expectFailure('duplicate slug', static function (&$v, &$f) { $f['collections'][1]['films'][1]['slug'] = 'k_town_noir'; }, 'duplicate slug');
    expectFailure('bad reference', static function (&$v, &$f) { $f['featuredFilm'] = 'missing'; }, 'must reference exactly one canonical film');
    expectFailure('invalid film type', static function (&$v, &$f) { $f['collections'][1]['films'][0]['type'] = 'Movie'; }, 'expected Short Film or Documentary');
    expectFailure('invalid collection presentation', static function (&$v, &$f) { $f['collections'][0]['presentation'] = 'unknown'; }, 'expected filmography or series');
    expectFailure('invalid section kind', static function (&$v, &$f) { $v['sections'][0]['kind'] = 'generic'; }, 'expected channel, series, commissions or experience');
    expectFailure('missing thumbnail', static function (&$v, &$f) { $v['sections'][0]['items'][0]['thumbnail'] = 'missing.webp'; }, 'videography.sections[0].items[0].thumbnail: missing or invalid asset');
    expectFailure('missing poster', static function (&$v, &$f) { $f['collections'][1]['films'][0]['posters'] = ['missing.png']; }, 'posters[0]: missing or invalid asset');
    expectFailure('missing directory', static function (&$v, &$f) { $f['collections'][1]['films'][2]['screenshotsDirectory'] = 'screenshots/missing'; }, 'screenshotsDirectory: missing or invalid directory');
    expectFailure('unsupported provider', static function (&$v, &$f) { $v['sections'][0]['items'][0]['video']['type'] = 'vimeo'; }, 'unsupported video provider');
    expectFailure('malformed video', static function (&$v, &$f) { $v['sections'][0]['items'][0]['video'] = 'None'; }, 'video: expected a JSON object');
    expectFailure('invalid YouTube host', static function (&$v, &$f) { $v['sections'][0]['items'][0]['video']['url'] = 'https://youtube.com.example.org/watch?v=Qs6sIiztsIQ'; }, 'invalid YouTube URL');
    expectFailure('invalid YouTube ID', static function (&$v, &$f) { $v['sections'][0]['items'][0]['video']['url'] = 'https://youtu.be/bad'; }, 'invalid YouTube URL');
    expectFailure('invalid HLS', static function (&$v, &$f) { $f['collections'][1]['films'][0]['video']['url'] = '/media/film.mp4'; }, 'ending in .m3u8');
    expectFailure('malformed list', static function (&$v, &$f) { $f['collections'] = 'None'; }, 'expected a JSON array');
    expectFailure('traversal', static function (&$v, &$f) { $f['collections'][1]['films'][0]['thumbnail'] = '../images/noir.png'; }, 'use a relative path');
    expectFailure('legacy path', static function (&$v, &$f) { $f['collections'][1]['films'][0]['thumbnail'] = '/public/images/noir.png'; }, 'legacy /public/images/ assets are disallowed');
    expectFailure('legacy browser path', static function (&$v, &$f) { $f['collections'][1]['films'][0]['thumbnail'] = '/images/noir.png'; }, 'legacy /public/images/ assets are disallowed');
    expectFailure('invalid image field', static function (&$v, &$f) { $f['collections'][1]['films'][0]['thumbnail'] = ['unexpected']; }, 'a nonempty string is required');
    expectFailure('mixed screenshot definitions', static function (&$v, &$f) { $f['collections'][1]['films'][2]['screenshots'] = []; }, 'use screenshots OR screenshotsDirectory');
    writeSource($videoSource, $filmSource);
    file_put_contents("$temporary/public/portfolio/short_film/short-films.json", '{bad json');
    try {
        PortfolioMedia\compile("$temporary/public");
        throw new RuntimeException('malformed JSON unexpectedly passed');
    } catch (RuntimeException $exception) {
        check(str_contains($exception->getMessage(), 'Syntax error'), 'malformed JSON must fail with its source name');
    }
    fwrite(STDOUT, "Portfolio media: $checks checks passed.\n");
} finally {
    // Remove only this verified isolated fixture, never originals or a computed parent directory.
    $resolved = realpath($temporary);
    if ($resolved !== false && str_starts_with($resolved, realpath(sys_get_temp_dir()) . DIRECTORY_SEPARATOR . 'portfolio-media-tests-')) {
        $entries = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($resolved, FilesystemIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST);
        foreach ($entries as $entry) {
            if ($entry->isDir()) rmdir($entry->getPathname());
            else unlink($entry->getPathname());
        }
        rmdir($resolved);
    }
}
