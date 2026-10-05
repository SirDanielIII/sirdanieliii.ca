<?php

declare(strict_types=1);

// This is an authoring/build tool outside the public web root, not a writable HTTP cache.
if (PHP_SAPI !== 'cli') {
    exit(1);
}
require_once __DIR__ . '/../../public/scripts/photography/catalog.php';

try {
    $count = Photography\writeManifest(
        __DIR__ . '/../../public/portfolio/photography',
        Photography\categories()
    );
    fwrite(STDOUT, sprintf("Photography manifest: %d published photographs.\n", $count));
} catch (Throwable $exception) {
    fwrite(STDERR, 'Photography compilation failed: ' . $exception->getMessage() . "\n");
    exit(1);
}
