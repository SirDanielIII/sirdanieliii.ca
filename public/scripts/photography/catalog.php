<?php

declare(strict_types=1);

namespace Photography;

const SCHEMA_VERSION = 1;

function readJson(string $path): array
{
    if (filesize($path) > 65536) {
        throw new \RuntimeException('Photography sidecar is too large.');
    }
    $contents = file_get_contents($path);
    if ($contents === false) {
        throw new \RuntimeException('Photography data could not be read.');
    }
    $decoded = json_decode($contents, true, 32, JSON_THROW_ON_ERROR);
    if (! is_array($decoded)) {
        throw new \RuntimeException('Photography data must be a JSON object.');
    }
    return $decoded;
}

function categories(): array
{
    $categories = readJson(__DIR__ . '/config.json');
    foreach ($categories as $id => $category) {
        if (! preg_match('/\A[a-z0-9][a-z0-9_-]*\z/', (string) $id)
            || ! is_array($category) || ! is_string($category['title'] ?? null)
            || ! in_array($category['status'] ?? null, ['published', 'coming-soon'], true)) {
            throw new \RuntimeException('Invalid photography category configuration.');
        }
    }
    return $categories;
}

function validImageFilename(mixed $filename): bool
{
    return is_string($filename)
        && ! str_contains($filename, '..')
        && (bool) preg_match('/\A[a-zA-Z0-9][a-zA-Z0-9_. -]*\.(?:jpe?g|png|webp|avif|tiff?|gif|bmp)\z/i', $filename);
}

/** Resolve only a direct child of a trusted directory; symlinks cannot escape it. */
function childFile(string $directory, string $filename): string
{
    if (basename($filename) !== $filename || str_contains($filename, '\\') || str_contains($filename, "\0")) {
        throw new \RuntimeException('Invalid photography filename.');
    }
    $parent = realpath($directory);
    $path = $directory . DIRECTORY_SEPARATOR . $filename;
    $resolved = realpath($path);
    if ($parent === false || $resolved === false || is_link($path) || ! is_file($resolved)
        || realpath(dirname($resolved)) !== $parent) {
        throw new \RuntimeException('Photography file is missing or outside its category.');
    }
    return $resolved;
}

function categoryDirectory(string $root, string $category): string
{
    if (! preg_match('/\A[a-z0-9][a-z0-9_-]*\z/', $category)) {
        throw new \RuntimeException('Invalid photography category.');
    }
    $parent = realpath($root);
    $directory = $root . DIRECTORY_SEPARATOR . $category;
    $resolved = realpath($directory);
    if ($parent === false || $resolved === false || is_link($directory) || ! is_dir($resolved)
        || realpath(dirname($resolved)) !== $parent) {
        throw new \RuntimeException('Photography category is missing or outside its root.');
    }
    return $resolved;
}

function text(mixed $value, string $fallback = ''): string
{
    return is_string($value) && trim($value) !== '' ? trim($value) : $fallback;
}

/** Only properties displayed in the viewer belong in the response. */
function metadata(array $data): array
{
    $value = static function (mixed $value, bool $positive = false): int|float|null {
        return (is_int($value) || is_float($value)) && is_finite((float) $value) && (! $positive || $value > 0)
            ? $value : null;
    };
    $capture = is_array($data['capture'] ?? null) ? $data['capture'] : [];
    $result = [
        'file' => ['type' => text($data['file']['type'] ?? null) ?: null, 'size_bytes' => $value($data['file']['size_bytes'] ?? null, true)],
        'image' => ['width' => $value($data['image']['width'] ?? null, true), 'height' => $value($data['image']['height'] ?? null, true)],
        'capture' => [
            'date_taken' => text($capture['date_taken'] ?? null) ?: null,
            'camera' => text($capture['camera'] ?? null) ?: null,
            'metering_mode' => text($capture['metering_mode'] ?? null) ?: null,
            'flash_mode' => text($capture['flash_mode'] ?? null) ?: null,
        ],
    ];
    foreach (['f_stop', 'exposure_time_seconds', 'iso_speed', 'exposure_bias_ev', 'focal_length_mm', 'focal_length_35mm'] as $key) {
        $result['capture'][$key] = $value($capture[$key] ?? null, $key !== 'exposure_bias_ev');
    }
    // EXIF MaxApertureValue is APEX: N = 2^(Av/2). Convert once on the PHP side
    // when loading the sidecar, retaining only the displayed f-number in the response.
    // Zero is valid (f/1); missing or implausible input must never invent an aperture.
    $apex = $value($capture['max_aperture_apex'] ?? null);
    $result['capture']['max_aperture_f_stop'] = $apex !== null && $apex >= -20 && $apex <= 40
        ? 2 ** ($apex / 2) : null;
    // A malformed sidecar must not create an extreme aspect ratio or invalid HTML dimensions.
    foreach (['width', 'height'] as $key) {
        if (! is_int($result['image'][$key]) || $result['image'][$key] > 100000) {
            $result['image'][$key] = null;
        }
    }
    return $result;
}

/** Asset versions follow current file stats, so browsers can reuse previews without serving stale edits. */
function assetVersion(string $path): string
{
    return dechex((int) filemtime($path)) . '-' . dechex((int) filesize($path));
}

function record(string $directory, string $filename, string $baseUrl, string $category, string $categoryTitle, ?array $data = null): array
{
    if (! validImageFilename($filename)) throw new \RuntimeException("Invalid photography filename.");
    $original = childFile($directory, $filename);
    $sidecar = pathinfo($filename, PATHINFO_FILENAME) . '.json';
    $sidecarPath = childFile($directory, $sidecar);
    // Gallery discovery already decoded this sidecar; standalone records still read it here.
    $data ??= readJson($sidecarPath);
    if (($data['filename'] ?? null) !== $filename) {
        throw new \RuntimeException('Invalid photography sidecar filename.');
    }
    $preview = $data['preview_filename'] ?? null;
    $previewPath = null;
    if ($preview !== null) {
        try {
            $expected = 'previews/' . pathinfo($filename, PATHINFO_FILENAME) . '.webp';
            if ($preview !== $expected && $preview !== 'preview-' . pathinfo($filename, PATHINFO_FILENAME) . '.webp') {
                throw new \RuntimeException('Invalid photography preview filename.');
            }
            $previewPath = str_starts_with($preview, 'previews/')
                ? childFile(categoryDirectory($directory, 'previews'), substr($preview, 9))
                : childFile($directory, $preview);
        } catch (\Throwable) {
            // Respect explicit null and gracefully fall back if a previously indexed preview was removed.
            $preview = null;
        }
    }
    $metadata = metadata(is_array($data['metadata'] ?? null) ? $data['metadata'] : []);
    $width = $metadata['image']['width'];
    $height = $metadata['image']['height'];
    $weight = $data['weighting'] ?? 0;
    if ((! is_int($weight) && ! is_float($weight)) || ! is_finite((float) $weight)) {
        $weight = 0;
    }
    $title = text($data['title'] ?? null, $categoryTitle . ' photograph');
    $description = text($data['description'] ?? null);
    $alt = text($data['alt'] ?? null, $description !== '' ? $description : $title);
    // Older or hand-written camera-counter titles must not become filename-based alt text.
    if (text($data['alt'] ?? null) === '' && $description === ''
        && (preg_match('/\A(?:dsc[fn]?|img|pxl|dji)[_ -]?\d/i', $alt) || $alt === 'Untitled photograph')) {
        $alt = $categoryTitle . ' photograph';
    }
    return [
        'id' => substr(hash('sha256', $category . '/' . $filename), 0, 32),
        'filename' => $filename,
        'preview_filename' => $preview,
        'src' => $baseUrl . rawurlencode($filename) . '?v=' . assetVersion($original),
        'preview_src' => $previewPath === null ? null : $baseUrl . implode('/', array_map('rawurlencode', explode('/', $preview))) . '?v=' . assetVersion($previewPath),
        'title' => $title,
        'description' => $description,
        'alt' => $alt,
        'category' => $category,
        'category_title' => $categoryTitle,
        'width' => $width,
        'height' => $height,
        'weighting' => $weight,
        'metadata' => $metadata,
    ];
}

/** Sidecars are the live source of gallery membership; no EXIF or generated manifest. */
function loadGallery(string $root, array $configuration): array
{
    if (! is_dir($root)) {
        throw new \RuntimeException('Photography source folder is missing.');
    }
    $photos = [];
    $categories = [];
    foreach ($configuration as $id => $category) {
        $count = 0;
        $directory = $root . DIRECTORY_SEPARATOR . $id;
        if ($category['status'] === 'published' && is_dir($directory)) {
            $directory = categoryDirectory($root, $id);
            foreach (new \DirectoryIterator($directory) as $entry) {
                // Removing the JSON unpublishes a photo while retaining its original.
                if ($entry->isDot() || $entry->isLink() || ! $entry->isFile() || $entry->getExtension() !== 'json') continue;
                try {
                    $data = readJson($entry->getPathname());
                    $filename = $data['filename'] ?? null;
                    if (! validImageFilename($filename) || pathinfo($filename, PATHINFO_FILENAME) . '.json' !== $entry->getFilename()) {
                        throw new \RuntimeException('Invalid photo sidecar filename.');
                    }
                    $photos[] = record($directory, $filename, '/portfolio/photography/' . rawurlencode($id) . '/', $id, $category['title'], $data);
                    $count++;
                } catch (\Throwable $exception) {
                    error_log("Photography: skipping $id/{$entry->getFilename()}: {$exception->getMessage()}");
                }
            }
        }
        $categories[] = ['id' => $id, 'title' => $category['title'], 'status' => $category['status'], 'count' => $count];
    }
    // Natural title ordering and a stable ID break weighting ties deterministically.
    usort($photos, static function (array $left, array $right): int {
        return ($right['weighting'] <=> $left['weighting'])
            ?: strnatcasecmp($left['title'], $right['title'])
            ?: strcmp($left['id'], $right['id']);
    });
    return ['schema_version' => SCHEMA_VERSION, 'categories' => $categories, 'photos' => $photos];
}
