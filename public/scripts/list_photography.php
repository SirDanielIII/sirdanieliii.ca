<?php

declare(strict_types=1);

ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
// Always revalidate the small manifest; unchanged responses cost no image scans or JSON parsing.
header('Cache-Control: public, no-cache');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if (! in_array($method, ['GET', 'HEAD'], true)) {
    header('Allow: GET, HEAD');
    http_response_code(405);
    echo '{"error":"Method not allowed."}';
    exit;
}
// This endpoint has one fixed data source. Client paths and per-file requests are never accepted.
if ($_GET !== []) {
    http_response_code(400);
    echo '{"error":"This endpoint does not accept parameters."}';
    exit;
}

$manifest = __DIR__ . '/../portfolio/photography/gallery-manifest.json';
$json = is_file($manifest) && ! is_link($manifest) ? file_get_contents($manifest) : false;
if ($json === false) {
    http_response_code(503);
    header('Cache-Control: no-store');
    if ($method !== 'HEAD') {
        echo '{"error":"Photography is temporarily unavailable. Please try again later."}';
    }
    exit;
}

// Hash the complete compiled snapshot rather than timestamps, which can collide during quick edits.
$etag = '"' . hash('sha256', $json) . '"';
header('ETag: ' . $etag);
if (in_array($etag, array_map('trim', explode(',', $_SERVER['HTTP_IF_NONE_MATCH'] ?? '')), true)) {
    http_response_code(304);
    exit;
}
if ($method !== 'HEAD') {
    echo $json;
}
