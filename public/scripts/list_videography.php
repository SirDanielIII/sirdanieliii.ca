<?php

declare(strict_types=1);
require_once __DIR__ . '/serve_json.php';
require_once __DIR__ . '/portfolio_media/catalog.php';

serveJson(static fn(): array => PortfolioMedia\loadCatalog(dirname(__DIR__), 'videography')['videography']);
