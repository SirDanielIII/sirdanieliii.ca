<?php

declare(strict_types=1);

/** Revalidate live JSON without maintaining a generated content cache. */
function serveJson(callable $load): void
{
    ini_set('display_errors', '0');
    error_reporting(E_ALL);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: public, no-cache');
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if (! in_array($method, ['GET', 'HEAD'], true) || $_GET !== []) {
        http_response_code($method === 'GET' || $method === 'HEAD' ? 400 : 405);
        header('Allow: GET, HEAD');
        if ($method !== 'HEAD') echo '{"error":"Unsupported request."}';
        return;
    }
    try {
        $json = json_encode($load(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        $etag = '"' . hash('sha256', $json) . '"';
        header('ETag: ' . $etag);
        if (in_array($etag, array_map('trim', explode(',', $_SERVER['HTTP_IF_NONE_MATCH'] ?? '')), true)) {
            http_response_code(304);
        } elseif ($method !== 'HEAD') {
            echo $json;
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        http_response_code(503);
        header('Cache-Control: no-store');
        if ($method !== 'HEAD') echo '{"error":"Content is temporarily unavailable. Please try again."}';
    }
}
