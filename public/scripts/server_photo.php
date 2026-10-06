<?php

declare(strict_types=1);
require_once __DIR__ . '/serve_json.php';
require_once __DIR__ . '/photography/catalog.php';

serveJson(static fn(): array => Photography\record(dirname(__DIR__), 'SD_NAS.JPG', '/', 'home', 'About my server'));
