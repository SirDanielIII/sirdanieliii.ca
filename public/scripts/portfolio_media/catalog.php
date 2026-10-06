<?php

declare(strict_types=1);

namespace PortfolioMedia;

// Reuse Photography's safe file resolution and cache versions, never its sidecar reader.
require_once __DIR__ . '/../photography/catalog.php';

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'bmp'];

final class Catalog
{
    public array $errors = [];
    private array $slugs = [];
    private array $imageAlts = [];

    public function __construct(private string $root, private string $urlPrefix) {}

    private function error(string $context, string $message): void
    {
        $this->errors[] = "$context: $message";
    }

    public function object(mixed $value, string $context): array
    {
        if (! is_array($value) || ($value !== [] && array_is_list($value))) {
            $this->error($context, 'expected a JSON object');
            return [];
        }
        return $value;
    }

    public function list(mixed $value, string $context): array
    {
        if (! is_array($value) || ! array_is_list($value)) {
            $this->error($context, 'expected a JSON array');
            return [];
        }
        return $value;
    }

    private function text(mixed $value, string $context, bool $required = false): string
    {
        if ($value === null && ! $required) return '';
        if (! is_string($value) || ($required && trim($value) === '')) {
            $this->error($context, $required ? 'a nonempty string is required' : 'expected a string or null');
            return '';
        }
        return trim($value);
    }

    private function slug(mixed $value, string $context): string
    {
        $slug = $this->text($value, "$context.slug", true);
        if (! preg_match('/\A[a-z0-9][a-z0-9_-]*\z/', $slug)) {
            $this->error("$context.slug", 'use lowercase letters, digits, hyphens or underscores');
        } elseif (isset($this->slugs[$slug])) {
            $this->error("$context.slug", "duplicate slug '$slug' (first used in {$this->slugs[$slug]})");
        }
        $this->slugs[$slug] = $context;
        return $slug;
    }

    public function rejectLegacy(mixed $value, string $context): void
    {
        if (is_array($value)) {
            foreach ($value as $key => $child) $this->rejectLegacy($child, "$context.$key");
        } elseif (is_string($value) && preg_match('~(?:^|https?://[^/]+/)/?(?:public/)?images(?:/|\\\\)~i', $value)) {
            $this->error($context, 'legacy /public/images/ assets are disallowed');
        }
    }

    private function resolve(mixed $value, string $context, bool $directory = false): ?string
    {
        $relative = $this->text($value, $context, true);
        if ($relative === '' || preg_match('~(^/|\\\\|:|\x00|(?:^|/)\.\.?(/|$))~', $relative)) {
            $this->error($context, 'use a relative path inside the portfolio asset directory');
            return null;
        }
        $root = realpath($this->root);
        $candidate = $this->root . '/' . $relative;
        $path = realpath($candidate);
        if ($root === false || $path === false || is_link($candidate)
            || ! str_starts_with($path, $root . DIRECTORY_SEPARATOR)
            || ($directory ? ! is_dir($path) : ! is_file($path))) {
            $this->error($context, "missing or invalid " . ($directory ? 'directory' : 'asset') . ": {$this->root}/$relative");
            return null;
        }
        if (! $directory) {
            try {
                return \Photography\childFile(dirname($path), basename($path));
            } catch (\Throwable) {
                $this->error($context, "invalid asset: $relative");
                return null;
            }
        }
        return $path;
    }

    private function image(mixed $value, string $context, string $alt): ?array
    {
        if ($value === null) return null;
        $path = $this->resolve($value, $context);
        if ($path === null) return null;
        if (! in_array(strtolower(pathinfo($path, PATHINFO_EXTENSION)), IMAGE_EXTENSIONS, true)) {
            $this->error($context, 'unsupported browser image format');
            return null;
        }
        $dimensions = @getimagesize($path);
        if ($dimensions === false) {
            $this->error($context, "unreadable image: $value");
            return null;
        }
        return [
            'src' => $this->urlPrefix . '/' . implode('/', array_map('rawurlencode', explode('/', (string) $value)))
                . '?v=' . \Photography\assetVersion($path),
            'alt' => $this->imageAlts[(string) $value] ?? $alt,
            'width' => $dimensions[0],
            'height' => $dimensions[1],
            'previewSrc' => $this->previewUrl((string) $value),
        ];
    }

    private function previewUrl(string $relative): ?string
    {
        $directory = dirname($relative);
        $preview = 'previews/' . ($directory === '.' ? '' : $directory . '/') . 'preview-' . basename($relative) . '.webp';
        $candidate = $this->root . '/' . $preview;
        if (! is_file($candidate)) return null;
        $path = $this->resolve($preview, "preview of $relative");
        return $path === null ? null : $this->urlPrefix . '/' . implode('/', array_map('rawurlencode', explode('/', $preview)))
            . '?v=' . \Photography\assetVersion($path);
    }

    private function externalLink(mixed $value, string $context): ?array
    {
        if ($value === null) return null;
        $link = $this->object($value, $context);
        $url = $this->text($link['url'] ?? null, "$context.url", true);
        if (! filter_var($url, FILTER_VALIDATE_URL) || parse_url($url, PHP_URL_SCHEME) !== 'https') {
            $this->error("$context.url", 'expected a valid HTTPS URL');
        }
        return ['url' => $url, 'label' => $this->text($link['label'] ?? null, "$context.label", true)];
    }

    /** Per-file descriptions preserve the authored thumbnail/poster strings and directory discovery. */
    private function readImageAlts(mixed $value, string $context): void
    {
        $this->imageAlts = [];
        foreach ($this->object($value, $context) as $path => $alt) {
            $this->imageAlts[$path] = $this->text($alt, "$context.$path", true);
        }
    }

    private function video(mixed $value, string $context): ?array
    {
        if ($value === null) return null;
        $video = $this->object($value, $context);
        $type = $video['type'] ?? null;
        $url = $this->text($video['url'] ?? null, "$context.url", true);
        if ($type === 'youtube') {
            $parts = parse_url($url);
            $host = strtolower($parts['host'] ?? '');
            $path = $parts['path'] ?? '';
            parse_str($parts['query'] ?? '', $query);
            $id = null;
            if ($host === 'youtu.be') $id = substr($path, 1);
            if (in_array($host, ['youtube.com', 'www.youtube.com', 'm.youtube.com'], true)) {
                $id = $path === '/watch' ? ($query['v'] ?? null) : null;
                if (preg_match('~^/(?:embed|shorts)/([^/]+)$~', $path, $match)) $id = $match[1];
            }
            if (($parts['scheme'] ?? '') !== 'https' || ! is_string($id) || ! preg_match('/\A[A-Za-z0-9_-]{11}\z/', $id)
                || isset($parts['user']) || isset($parts['pass'])) {
                $this->error($context, 'invalid YouTube URL; use an HTTPS watch, youtu.be, shorts or embed URL with an 11-character ID');
                return null;
            }
            return ['type' => 'youtube', 'url' => $url, 'embedUrl' => "https://www.youtube-nocookie.com/embed/$id?autoplay=1&rel=0"];
        }
        if ($type === 'hls') {
            $parts = parse_url($url);
            $path = $parts['path'] ?? '';
            $absolute = filter_var($url, FILTER_VALIDATE_URL) && ($parts['scheme'] ?? '') === 'https';
            $relative = str_starts_with($url, '/media/') && ! str_starts_with($url, '//');
            if ((! $absolute && ! $relative) || ! str_ends_with(strtolower($path), '.m3u8')
                || isset($parts['user']) || isset($parts['pass']) || isset($parts['query']) || isset($parts['fragment'])
                || preg_match('~(?:^|/)\.\.(/|$)~', rawurldecode($path))) {
                $this->error($context, 'HLS requires an HTTPS or /media/ URL ending in .m3u8, without credentials or query parameters');
                return null;
            }
            // Production's public Apache route stays independent of Jellyfin and its IDs.
            if (($parts['host'] ?? '') === 'sirdanieliii.ca' && str_starts_with($path, '/media/')) $url = $path;
            return ['type' => 'hls', 'url' => $url];
        }
        $this->error("$context.type", 'unsupported video provider; expected youtube or hls');
        return null;
    }

    private function work(array $item, string $context): array
    {
        $title = $this->text($item['title'] ?? null, "$context.title", true);
        return [
            'slug' => $this->slug($item['slug'] ?? null, $context),
            'title' => $title,
            'thumbnail' => $this->image($item['thumbnail'] ?? null, "$context.thumbnail", "Still from $title"),
            'video' => $this->video($item['video'] ?? null, "$context.video"),
        ];
    }

    private function videoItems(mixed $value, string $context): array
    {
        $items = [];
        foreach ($this->list($value, $context) as $index => $value) {
            $at = "{$context}[$index]";
            $item = $this->object($value, $at);
            $presentation = $item['presentation'] ?? 'standard';
            if (! in_array($presentation, ['feature', 'standard'], true)) {
                $this->error("$at.presentation", 'expected feature or standard');
            }
            $items[] = $this->work($item, $at) + [
                'description' => $this->text($item['description'] ?? null, "$at.description"),
                'date' => $this->text($item['date'] ?? null, "$at.date"),
                'presentation' => $presentation,
            ];
        }
        return $items;
    }

    private function videoCollection(array $source, string $context): array
    {
        return [
            'slug' => $this->slug($source['slug'] ?? null, $context),
            'title' => $this->text($source['title'] ?? null, "$context.title", true),
            'items' => $this->videoItems($source['items'] ?? [], "$context.items"),
        ];
    }

    public function videography(array $source): array
    {
        $this->readImageAlts($source['imageAlts'] ?? [], 'videography.imageAlts');
        $sections = [];
        foreach ($this->list($source['sections'] ?? null, 'videography.sections') as $index => $value) {
            $at = "videography.sections[$index]";
            $section = $this->object($value, $at);
            $kind = $section['kind'] ?? null;
            $base = [
                'kind' => $kind,
                'slug' => $this->slug($section['slug'] ?? null, $at),
                'title' => $this->text($section['title'] ?? null, "$at.title", true),
                'label' => $this->text($section['label'] ?? null, "$at.label"),
                'description' => $this->text($section['description'] ?? null, "$at.description"),
            ];
            if ($kind === 'experience') {
                $base['logo'] = $this->image($section['logo'] ?? null, "$at.logo", $base['title'] . ' logo');
                foreach (['organization', 'location', 'workMode', 'employment', 'start', 'end'] as $field) {
                    $base[$field] = $this->text($section[$field] ?? null, "$at.$field", true);
                }
                $sections[] = $base;
                continue;
            }
            if (! in_array($kind, ['channel', 'series', 'commissions'], true)) {
                $this->error("$at.kind", 'expected channel, series, commissions or experience');
            }
            $groups = [];
            foreach ($this->list($section['groups'] ?? [], "$at.groups") as $groupIndex => $value) {
                $groupAt = "$at.groups[$groupIndex]";
                $group = $this->object($value, $groupAt);
                $collections = [];
                foreach ($this->list($group['collections'] ?? [], "$groupAt.collections") as $collectionIndex => $value) {
                    $collectionAt = "$groupAt.collections[$collectionIndex]";
                    $collections[] = $this->videoCollection($this->object($value, $collectionAt), $collectionAt);
                }
                $groups[] = $this->videoCollection($group, $groupAt) + [
                    'logo' => $this->image($group['logo'] ?? null, "$groupAt.logo", $group['title'] . ' logo'),
                    'description' => $this->text($group['description'] ?? null, "$groupAt.description"),
                    'link' => $this->externalLink($group['link'] ?? null, "$groupAt.link"),
                    'collections' => $collections,
                ];
            }
            $sections[] = $base + [
                'collectionTitle' => $this->text($section['collectionTitle'] ?? null, "$at.collectionTitle"),
                'logo' => $this->image($section['logo'] ?? null, "$at.logo", $base['title'] . ' logo'),
                'link' => $this->externalLink($section['link'] ?? null, "$at.link"),
                'items' => $this->videoItems($section['items'] ?? [], "$at.items"),
                'groups' => $groups,
            ];
        }
        return ['sections' => $sections];
    }

    private function galleryImages(mixed $value, string $context, string $title, string $kind): array
    {
        $images = [];
        foreach ($this->list($value, $context) as $index => $value) {
            $caption = "$title — " . strtolower($kind) . ' ' . ($index + 1);
            $image = $this->image($value, "{$context}[$index]", $caption);
            if ($image !== null) $images[] = $image + ['title' => $caption, 'kind' => $kind];
        }
        return $images;
    }

    private function film(array $film, string $at): array
    {
        $base = $this->work($film, $at);
        $type = $film['type'] ?? null;
        $status = $film['status'] ?? 'released';
        $year = $film['year'] ?? null;
        if (! in_array($type, ['Short Film', 'Documentary'], true)) $this->error("$at.type", 'expected Short Film or Documentary');
        if (! in_array($status, ['released', 'coming-soon'], true)) $this->error("$at.status", 'expected released or coming-soon');
        if (! is_int($year) || $year < 1888 || $year > 2200) $this->error("$at.year", 'expected a four-digit year');
        $screenshots = $film['screenshots'] ?? [];
        if (isset($film['screenshotsDirectory'])) {
            if (array_key_exists('screenshots', $film)) $this->error($at, 'use screenshots OR screenshotsDirectory, not both');
            $directory = $this->resolve($film['screenshotsDirectory'], "$at.screenshotsDirectory", true);
            $screenshots = [];
            if ($directory !== null) {
                // Preserve filesystem discovery order. Never sort images or content entries.
                foreach (new \FilesystemIterator($directory, \FilesystemIterator::SKIP_DOTS) as $file) {
                    if ($file->isFile() && in_array(strtolower($file->getExtension()), IMAGE_EXTENSIONS, true)) {
                        $screenshots[] = $film['screenshotsDirectory'] . '/' . $file->getFilename();
                    }
                }
            }
        }
        return $base + [
            'year' => $year,
            'type' => $type,
            'status' => $status,
            'synopsis' => $this->text($film['synopsis'] ?? null, "$at.synopsis"),
            'funFact' => $this->text($film['funFact'] ?? null, "$at.funFact"),
            'posters' => $this->galleryImages($film['posters'] ?? [], "$at.posters", $base['title'], 'Poster'),
            'screenshots' => $this->galleryImages($screenshots, "$at.screenshots", $base['title'], 'Still'),
        ];
    }

    public function shortFilms(array $source): array
    {
        $this->readImageAlts($source['imageAlts'] ?? [], 'short-films.imageAlts');
        $collections = [];
        foreach ($this->list($source['collections'] ?? null, 'short-films.collections') as $index => $value) {
            $at = "short-films.collections[$index]";
            $collection = $this->object($value, $at);
            $presentation = $collection['presentation'] ?? 'filmography';
            if (! in_array($presentation, ['filmography', 'series'], true)) {
                $this->error("$at.presentation", 'expected filmography or series');
            }
            $films = [];
            foreach ($this->list($collection['films'] ?? null, "$at.films") as $filmIndex => $value) {
                $filmAt = "$at.films[$filmIndex]";
                $films[] = $this->film($this->object($value, $filmAt), $filmAt);
            }
            $collections[] = [
                'slug' => $this->slug($collection['slug'] ?? null, $at),
                'title' => $this->text($collection['title'] ?? null, "$at.title", true),
                'label' => $this->text($collection['label'] ?? null, "$at.label"),
                'link' => $this->externalLink($collection['link'] ?? null, "$at.link"),
                'films' => $films,
                'presentation' => $presentation,
            ];
        }
        $featured = $source['featuredFilm'] ?? null;
        if ($featured !== null) {
            $featured = $this->text($featured, 'short-films.featuredFilm', true);
            $matches = array_filter(array_merge(...array_column($collections, 'films')), static fn(array $film): bool => $film['slug'] === $featured);
            if (count($matches) !== 1) $this->error('short-films.featuredFilm', "'$featured' must reference exactly one canonical film");
        }
        return ['featuredFilm' => $featured, 'collections' => $collections];
    }
}

/** Load editable public JSON at request time, preserving all authored array ordering. */
function loadCatalog(string $publicDirectory, ?string $section = null): array
{
    $result = [];
    $errors = [];
    foreach (['videography' => 'video', 'short-films' => 'short_film'] as $name => $assets) {
        if ($section !== null && $section !== $name) continue;
        $catalog = new Catalog("$publicDirectory/portfolio/$assets", "/portfolio/$assets");
        try {
            $sourcePath = "$publicDirectory/portfolio/$assets/$name.json";
            if (! is_file($sourcePath)) throw new \RuntimeException("source JSON not found: $sourcePath");
            $json = file_get_contents($sourcePath);
            if ($json === false) throw new \RuntimeException('source JSON could not be read');
            $source = $catalog->object(json_decode($json, true, 64, JSON_THROW_ON_ERROR), $name);
            $catalog->rejectLegacy($source, $name);
            $result[$name] = $name === 'videography' ? $catalog->videography($source) : $catalog->shortFilms($source);
        } catch (\Throwable $exception) {
            $errors[] = "$name: {$exception->getMessage()}";
        }
        array_push($errors, ...$catalog->errors);
    }
    if ($errors !== []) throw new \RuntimeException(implode("\n", $errors));
    return $result;
}
