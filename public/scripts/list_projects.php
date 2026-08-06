<?php

declare(strict_types=1);

ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

/**
 * End the request with a JSON error response.
 */
function respondWithError(string $message, int $status = 500): void
{
    http_response_code($status);
    echo json_encode(['error' => $message], JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

/**
 * Keep the API usable if a project is missing optional metadata.
 */
function defaultProject(string $folder, string $folderPath): array
{
    $thumbnailPath = $folderPath . DIRECTORY_SEPARATOR . 'icon.png';

    return [
        'title' => str_replace('_', ' ', $folder),
        'description' => '',
        'tags' => [],
        'actions' => [
            'visit' => '/projects/' . rawurlencode($folder) . '/',
        ],
        'thumbnail' => is_file($thumbnailPath) ? 'icon.png' : null,
        'version' => '',
        'lastUpdated' => date('Y-m-d', (int) filemtime($folderPath)),
        'colors' => [
            'light' => [
                'title' => '#6A35A5',
                'background' => '#F7F2FF',
                'description' => '#2D2338',
            ],
            'dark' => [
                'title' => '#BA85E8',
                'background' => '#1E0A3C',
                'description' => '#E6DFEC',
            ],
        ],
    ];
}

/**
 * Convert the former top-level link fields into the independent actions object.
 */
function normalizeActions(array $metadata): array
{
    $actions = isset($metadata['actions']) && is_array($metadata['actions'])
        ? $metadata['actions']
        : [];

    $legacyActions = [
        'download' => 'download',
        'github' => 'github',
        'link' => 'visit',
    ];

    foreach ($legacyActions as $legacyKey => $actionKey) {
        if (! isset($actions[$actionKey]) && isset($metadata[$legacyKey])) {
            $actions[$actionKey] = $metadata[$legacyKey];
        }
    }

    $normalized = [];
    foreach (['download', 'github', 'visit'] as $actionKey) {
        if (isset($actions[$actionKey]) && is_string($actions[$actionKey])) {
            $value = trim($actions[$actionKey]);
            if ($value !== '') {
                $normalized[$actionKey] = $value;
            }
        }
    }

    return $normalized;
}

$projectsDir = realpath(__DIR__ . '/../projects');

if ($projectsDir === false || ! is_dir($projectsDir)) {
    respondWithError('Projects directory not found.');
}

$results = [];
$entries = scandir($projectsDir);

if ($entries === false) {
    respondWithError('Projects directory could not be read.');
}

foreach ($entries as $entry) {
    if ($entry === '.' || $entry === '..') {
        continue;
    }

    $folderPath = $projectsDir . DIRECTORY_SEPARATOR . $entry;
    if (! is_dir($folderPath)) {
        continue;
    }

    $defaults = defaultProject($entry, $folderPath);
    $metadata = $defaults;
    $metadataFile = $folderPath . DIRECTORY_SEPARATOR . 'project.json';

    if (is_file($metadataFile)) {
        try {
            $decoded = json_decode((string) file_get_contents($metadataFile), true, 512, JSON_THROW_ON_ERROR);
            if (is_array($decoded)) {
                $metadata = array_replace($defaults, $decoded);
            }
        } catch (JsonException $exception) {
            error_log(sprintf('Invalid project metadata in %s: %s', $metadataFile, $exception->getMessage()));
        }
    }

    $tags = isset($metadata['tags']) && is_array($metadata['tags']) ? $metadata['tags'] : [];
    $tags = array_map('trim', array_filter($tags, 'is_string'));
    $metadata['tags'] = array_values(array_unique(array_filter(
        $tags,
        static function (string $tag): bool {
            return $tag !== '';
        }
    )));
    $metadata['actions'] = normalizeActions($metadata);

    foreach (['type', 'link', 'download', 'github'] as $legacyKey) {
        unset($metadata[$legacyKey]);
    }

    foreach (['light', 'dark'] as $mode) {
        $providedColors = isset($metadata['colors'][$mode]) && is_array($metadata['colors'][$mode])
            ? $metadata['colors'][$mode]
            : [];
        $metadata['colors'][$mode] = array_replace($defaults['colors'][$mode], $providedColors);
    }

    $metadata['folder'] = $entry;
    $results[] = $metadata;
}

usort($results, static function (array $left, array $right): int {
    $dateComparison = strcmp((string) ($right['lastUpdated'] ?? ''), (string) ($left['lastUpdated'] ?? ''));
    return $dateComparison !== 0
        ? $dateComparison
        : strcasecmp((string) ($left['title'] ?? ''), (string) ($right['title'] ?? ''));
});

try {
    echo json_encode(
        $results,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE | JSON_THROW_ON_ERROR
    );
} catch (JsonException $exception) {
    respondWithError('Project metadata could not be encoded.');
}
