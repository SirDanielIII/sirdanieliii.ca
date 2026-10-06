<?php

declare(strict_types=1);
require_once __DIR__ . '/serve_json.php';
require_once __DIR__ . '/photography/catalog.php';

serveJson(static fn(): array => Photography\loadGallery(__DIR__ . '/../portfolio/photography', Photography\categories()));
