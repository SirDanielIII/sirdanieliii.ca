<?php

declare(strict_types=1);

ini_set('display_errors', '0');
error_reporting(E_ALL);
header('Cache-Control: private, no-store');
header('X-Content-Type-Options: nosniff');

function portfolioResponse(array $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

// Config and documents live beside the web root, never inside it.
$configPath = dirname(__DIR__, 2) . '/private/portfolio.php';
if (!is_file($configPath)) {
    portfolioResponse(['error' => 'Portfolio access is temporarily unavailable.'], 503);
}
$config = require $configPath;
$password = $config['password'];
$configured = is_string($password) && $password !== '';

session_name('portfolio_access');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/scripts/',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'httponly' => true,
    'samesite' => 'Strict',
]);
session_start(['use_strict_mode' => 1, 'use_only_cookies' => 1]);

$passwordVersion = $configured ? hash('sha256', $password) : '';
$authenticated = $configured
    && ($_SESSION['portfolio_password_version'] ?? null) === $passwordVersion
    && ($_SESSION['portfolio_expires'] ?? 0) > time();
$action = $_GET['action'] ?? 'status';
$method = $_SERVER['REQUEST_METHOD'];

if (in_array($action, ['login', 'logout'], true)) {
    if ($method !== 'POST') {
        header('Allow: POST');
        portfolioResponse(['error' => 'Method not allowed.'], 405);
    }
    // Cross-origin forms cannot send this header; no cross-origin access is enabled.
    if (($_SERVER['HTTP_X_PORTFOLIO_REQUEST'] ?? '') !== '1') {
        portfolioResponse(['error' => 'Invalid request.'], 403);
    }
} elseif (!in_array($method, ['GET', 'HEAD'], true)) {
    header('Allow: GET, HEAD');
    portfolioResponse(['error' => 'Method not allowed.'], 405);
}

if ($action === 'status') {
    portfolioResponse(['authenticated' => $authenticated, 'configured' => $configured]);
}

if ($action === 'logout') {
    $_SESSION = [];
    session_destroy();
    $cookie = session_get_cookie_params();
    unset($cookie['lifetime']);
    $cookie['expires'] = time() - 3600;
    setcookie(session_name(), '', $cookie);
    portfolioResponse(['authenticated' => false]);
}

if ($action === 'login') {
    if (!$configured) {
        portfolioResponse(['error' => 'Portfolio access is temporarily unavailable.'], 503);
    }

    // Limit attempts by IP even if a visitor clears their session cookie.
    $ratePath = sys_get_temp_dir() . '/portfolio-login-' . hash('sha256', __FILE__ . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    $rateFile = fopen($ratePath, 'c+');
    if ($rateFile === false || !flock($rateFile, LOCK_EX)) {
        portfolioResponse(['error' => 'Please try again later.'], 503);
    }
    $rate = json_decode(stream_get_contents($rateFile), true);
    if (!is_array($rate) || ($rate['reset'] ?? 0) <= time()) {
        $rate = ['count' => 0, 'reset' => time() + 300];
    }
    if ($rate['count'] >= 20) {
        header('Retry-After: ' . max(1, $rate['reset'] - time()));
        flock($rateFile, LOCK_UN);
        fclose($rateFile);
        portfolioResponse(['error' => 'Too many attempts. Please try again in a few minutes.'], 429);
    }
    $rate['count']++;
    rewind($rateFile);
    ftruncate($rateFile, 0);
    fwrite($rateFile, json_encode($rate));
    flock($rateFile, LOCK_UN);
    fclose($rateFile);

    $body = json_decode(file_get_contents('php://input', false, null, 0, 4096), true);
    $provided = is_array($body) ? ($body['password'] ?? null) : null;
    if (!is_string($provided) || !hash_equals($password, $provided)) {
        portfolioResponse(['error' => 'That password is incorrect.'], 401);
    }

    session_regenerate_id(true);
    $_SESSION['portfolio_password_version'] = $passwordVersion;
    $_SESSION['portfolio_expires'] = time() + 8 * 60 * 60;
    portfolioResponse(['authenticated' => true]);
}

if ($action !== 'file') {
    portfolioResponse(['error' => 'Not found.'], 404);
}
if (!$authenticated) {
    portfolioResponse(['error' => 'Unlock the portfolio to view this document.'], 401);
}

$id = $_GET['id'] ?? '';
if (!is_string($id) || !isset($config['files'][$id])) {
    portfolioResponse(['error' => 'Document not found.'], 404);
}
// Resolve only configured IDs, never a visitor-supplied filesystem path.
$filename = $config['files'][$id];
$path = $config['directory'] . DIRECTORY_SEPARATOR . $filename;
if (!is_file($path) || !is_readable($path)) {
    portfolioResponse(['error' => 'Document not found.'], 404);
}
session_write_close();

$size = filesize($path);
$start = 0;
$end = $size - 1;
// Support a single byte range so the browser can seek through large PDFs.
$range = $method === 'GET' ? ($_SERVER['HTTP_RANGE'] ?? '') : '';
if ($range !== '' && preg_match('/^bytes=(\d*)-(\d*)$/', $range, $matches)) {
    if ($matches[1] === '' && $matches[2] !== '') {
        $start = max(0, $size - (int) $matches[2]);
    } else {
        $start = (int) $matches[1];
        $end = $matches[2] !== '' ? min($end, (int) $matches[2]) : $end;
    }
    if (($matches[1] === '' && $matches[2] === '') || $start > $end || $start >= $size) {
        header('Content-Range: bytes */' . $size);
        portfolioResponse(['error' => 'Requested range is unavailable.'], 416);
    }
    http_response_code(206);
    header("Content-Range: bytes $start-$end/$size");
}

$handle = fopen($path, 'rb');
if ($handle === false) {
    portfolioResponse(['error' => 'Document could not be opened.'], 500);
}
$disposition = ($_GET['download'] ?? '') === '1' ? 'attachment' : 'inline';
header('Content-Type: application/pdf');
header('Accept-Ranges: bytes');
header('Content-Length: ' . ($end - $start + 1));
header('Content-Disposition: ' . $disposition . '; filename="' . $id . '.pdf"; filename*=UTF-8\'\'' . rawurlencode($filename));
header('X-Frame-Options: SAMEORIGIN');
if ($method === 'HEAD') {
    fclose($handle);
    exit;
}
fseek($handle, $start);
$remaining = $end - $start + 1;
while ($remaining > 0 && !feof($handle) && !connection_aborted()) {
    $chunk = fread($handle, min(1024 * 1024, $remaining));
    if ($chunk === false || $chunk === '') break;
    echo $chunk;
    $remaining -= strlen($chunk);
}
fclose($handle);
