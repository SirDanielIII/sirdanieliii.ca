<?php
// Enable errors for debugging (remove in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Tell the client we’re sending JSON
header('Content-Type: application/json');

// Path to your projects directory (adjust if needed)
$projectsDir = realpath(__DIR__ . '/../projects');

if (! $projectsDir || ! is_dir($projectsDir)) {
    http_response_code(500);
    echo json_encode(['error' => "Projects directory not found: $projectsDir"]);
    exit;
}

$results = [];

// Loop through each entry in /projects
foreach (scandir($projectsDir) as $entry) {
    if ($entry === '.' || $entry === '..') {
        continue;
    }

    $folderPath = $projectsDir . DIRECTORY_SEPARATOR . $entry;
    if (! is_dir($folderPath)) {
        continue;
    }

    $metaFile = $folderPath . DIRECTORY_SEPARATOR . 'project.json';
    if (file_exists($metaFile)) {
        // Read and parse project.json
        $meta = json_decode(file_get_contents($metaFile), true);
        if (! is_array($meta)) {
            // Malformed JSON fallback
            $meta = [];
        }
    } else {
        // Fallback metadata if no project.json
        $meta = [
            'title'       => $entry,
            'description' => '',
            'tags'        => [],
            'type'        => 'link',
            'link'        => "/projects/$entry"
        ];
    }

    // Always include the folder name for routing/links
    $meta['folder'] = $entry;
    $results[] = $meta;
}

// Output the JSON
echo json_encode($results, JSON_PRETTY_PRINT);
