# Jellyfin Portfolio Streaming — Apache + React + HLS

This documents the working self-hosted setup used by `sirdanieliii.ca`.

## Goal

Serve selected Jellyfin videos through clean portfolio URLs such as:

```text
https://sirdanieliii.ca/media/k-town-noir/master.m3u8
```

while:

- keeping the Jellyfin hostname out of React;
- keeping the Jellyfin API key server-side;
- keeping Jellyfin IDs out of React;
- forcing a high-quality HLS transcode instead of exposing the original file;
- allowing only explicitly whitelisted portfolio videos.

## Architecture

```text
React / hls.js
      |
      | /media/k-town-noir/master.m3u8
      v
Apache (sirdanieliii.ca)
      |
      | RewriteMap: slug -> Jellyfin item ID
      | adds Jellyfin Authorization header
      v
Jellyfin (127.0.0.1:8096)
      |
      | GPU / FFmpeg transcode
      v
master.m3u8 -> main.m3u8 -> .ts segments
      |
      v
Apache -> Browser
```

The original media stays wherever Jellyfin normally reads it from (for example the Samba-backed library).

> This is not DRM. A technical user can still download/reassemble the HLS presentation stream. The useful protection is that the original/master file is not being handed to the browser through this route.

---

## 1. Media map

File:

```text
/SD_NAS/data/SERVER_RESOURCES/Websites/sirdanieliii-media.map
```

Contents:

```text
# Videography
silence-of-my-echos-trailer dc844223cdf6080cf59130fbeeab3b77
lt-smp-s3-trailer 94f4b8b556ae75d8ffc586579f541801
lt-smp-trailer 124456997a91a8a3dc71b480da90ff4f

# Short Films
the-bachelorette-party e31f9d4ae74e0ccab3f1de8b53c3bdea
k-town-noir c0826f56850f3809054cd0f4e90d0d5a
street-drugs 4e99f22dcea006f87d914dc02c2c776d
shelter 694e3c833c303012edf2677e580f3807
```

Format:

```text
public-slug jellyfin-item-id
```

Adding a new video requires only one new line.

Example:

```text
my-new-film 0123456789abcdef0123456789abcdef
```

Then the public URL becomes:

```text
https://sirdanieliii.ca/media/my-new-film/master.m3u8
```

Apache `txt:` RewriteMap files support whitespace-separated key/value pairs and `#` comments. Apache notices the map file's modification time, so editing this map normally does not require a reload.

---

## 2. Finding a Jellyfin item ID

Open the item's details page in Jellyfin.

Example:

```text
https://jellyfin.example.com/web/#/details?id=c0826f56850f3809054cd0f4e90d0d5a&serverId=...
```

The value after `id=` is the item ID:

```text
c0826f56850f3809054cd0f4e90d0d5a
```

The `serverId` is not needed here.

---

## 3. Apache HLS proxy configuration

Inside the HTTPS `sirdanieliii.ca` virtual host, before the React SPA fallback:

```apache
# ============================================================
# JELLYFIN PORTFOLIO STREAMING
# ============================================================

RewriteEngine On

# Public slug -> Jellyfin item ID
RewriteMap PortfolioMedia     "txt:/SD_NAS/data/SERVER_RESOURCES/Websites/sirdanieliii-media.map"

# Add Jellyfin authentication only to /media/*
# NEVER put this API key into React or a public URL.
<LocationMatch "^/media/">
    RequestHeader set Authorization         "MediaBrowser Token=\"JELLYFIN_API_KEY\""
</LocationMatch>


# ------------------------------------------------------------
# Master HLS playlist
# /media/k-town-noir/master.m3u8
# ------------------------------------------------------------

RewriteCond "${PortfolioMedia:$1|NOT_FOUND}" "!^NOT_FOUND$"
RewriteRule "^/media/([a-z0-9-]+)/master\.m3u8$"     "http://127.0.0.1:8096/Videos/${PortfolioMedia:$1}/master.m3u8?MediaSourceId=${PortfolioMedia:$1}&VideoCodec=h264&AudioCodec=aac&VideoBitrate=40000000&AudioBitrate=320000&MaxWidth=3840&MaxHeight=2160&SegmentContainer=ts&AllowVideoStreamCopy=false&AllowAudioStreamCopy=false&EnableAutoStreamCopy=false&EnableSubtitlesInManifest=false"     [P,L,NE]


# ------------------------------------------------------------
# Media playlist
# ------------------------------------------------------------

RewriteCond "${PortfolioMedia:$1|NOT_FOUND}" "!^NOT_FOUND$"
RewriteRule "^/media/([a-z0-9-]+)/main\.m3u8$"     "http://127.0.0.1:8096/Videos/${PortfolioMedia:$1}/main.m3u8"     [P,L,NE]


# ------------------------------------------------------------
# MPEG-TS HLS segments
# ------------------------------------------------------------

RewriteCond "${PortfolioMedia:$1|NOT_FOUND}" "!^NOT_FOUND$"
RewriteRule "^/media/([a-z0-9-]+)/hls1/main/([0-9]+)\.ts$"     "http://127.0.0.1:8096/Videos/${PortfolioMedia:$1}/hls1/main/$2.ts"     [P,L,NE]


# Block every other /media/ URL.
RewriteRule "^/media/" "-" [F,L]
```

Your existing React `<Directory ...>` SPA rewrite stays after this section.

Relevant modules:

```bash
sudo a2enmod rewrite
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers
```

After changing the vhost:

```bash
sudo apachectl configtest
sudo systemctl reload apache2
```

Only reload after `configtest` reports:

```text
Syntax OK
```

---

## 4. What the current Jellyfin settings mean

The master request currently specifies:

```text
MediaSourceId=<item ID>
VideoCodec=h264
AudioCodec=aac
VideoBitrate=40000000
AudioBitrate=320000
MaxWidth=3840
MaxHeight=2160
SegmentContainer=ts
AllowVideoStreamCopy=false
AllowAudioStreamCopy=false
EnableAutoStreamCopy=false
EnableSubtitlesInManifest=false
```

### MediaSourceId

Selects the media source Jellyfin should play. This parameter was required by Jellyfin's HLS endpoint.

### VideoCodec=h264

Requests H.264/AVC output. This is a conservative choice with broad browser compatibility.

### AudioCodec=aac

Requests AAC audio.

### VideoBitrate=40000000

Requests a roughly 40 Mbps video bitrate ceiling/target.

This is deliberately high for portfolio delivery. Jellyfin still considers source resolution, frame rate, codec and other constraints; it is not a guarantee that every output will be exactly 40 Mbps.

### AudioBitrate=320000

Requests 320 kbps AAC.

### MaxWidth=3840 / MaxHeight=2160

Allows output up to 3840×2160 (4K UHD).

### SegmentContainer=ts

Produces MPEG-TS HLS chunks:

```text
0.ts
1.ts
2.ts
...
```

### AllowVideoStreamCopy=false

Important: prevents Jellyfin from simply copying the original video bitstream into the delivery stream.

### AllowAudioStreamCopy=false

Forces audio encoding rather than copying the source audio stream.

### EnableAutoStreamCopy=false

Stops Jellyfin from automatically choosing a stream-copy path.

### EnableSubtitlesInManifest=false

Keeps Jellyfin-generated subtitle playlists out of the HLS manifest. This is deliberate for this public proxy; see the subtitle section.

---

## 5. Adjusting quality

Current 4K / high-quality setup:

```text
VideoBitrate=40000000
MaxWidth=3840
MaxHeight=2160
```

Possible 4K / lower-bandwidth test:

```text
VideoBitrate=25000000
MaxWidth=3840
MaxHeight=2160
```

Possible 1080p limit:

```text
VideoBitrate=15000000
MaxWidth=1920
MaxHeight=1080
```

After changing these values in the vhost:

```bash
sudo apachectl configtest
sudo systemctl reload apache2
```

Then play a video and confirm Jellyfin's dashboard reports **Transcoding**.

---

## 6. Test URLs

Examples:

```text
https://sirdanieliii.ca/media/k-town-noir/master.m3u8
https://sirdanieliii.ca/media/shelter/master.m3u8
https://sirdanieliii.ca/media/street-drugs/master.m3u8
```

For command-line testing:

```bash
curl -s https://sirdanieliii.ca/media/k-town-noir/master.m3u8 | head -30
```

A working HLS playlist should begin with:

```text
#EXTM3U
```

Do not rely on opening `.m3u8` directly in Chrome/Firefox as the playback test; use `hls.js` in the site.

---

# React setup

Install:

```bash
npm install hls.js
```

## Reusable component

```jsx
import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function PortfolioVideo({
  src,
  poster,
  subtitles = [],
  autoPlay = false,
  muted = false,
  loop = false,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !src) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (_event, data) => {
        console.error("HLS playback error:", data);
      });

      return () => hls.destroy();
    }

    // Native HLS fallback (notably Safari).
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      playsInline
      preload="metadata"
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controlsList="nodownload"
      style={{ width: "100%", height: "auto" }}
    >
      {subtitles.map((subtitle) => (
        <track
          key={subtitle.src}
          kind="subtitles"
          src={subtitle.src}
          srcLang={subtitle.lang}
          label={subtitle.label}
          default={subtitle.default}
        />
      ))}
    </video>
  );
}
```

Usage:

```jsx
<PortfolioVideo
  src="/media/k-town-noir/master.m3u8"
/>
```

Using a relative URL keeps React independent of the production hostname.

---

## Even simpler: pass only the slug

```jsx
import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function JellyfinPortfolioVideo({ slug, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    const src = `/media/${slug}/master.m3u8`;

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(src);
      hls.attachMedia(video);

      return () => hls.destroy();
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, [slug]);

  return (
    <video
      ref={ref}
      controls
      playsInline
      preload="metadata"
      controlsList="nodownload"
      {...props}
    />
  );
}
```

Usage:

```jsx
<JellyfinPortfolioVideo slug="k-town-noir" />
<JellyfinPortfolioVideo slug="shelter" />
```

React never needs the Jellyfin item ID.

---

# Subtitles

## Recommended method

Keep:

```text
EnableSubtitlesInManifest=false
```

and host `.vtt` subtitle files as ordinary website assets.

Example:

```text
/subtitles/k-town-noir.en.vtt
```

Example VTT:

```vtt
WEBVTT

00:00:01.000 --> 00:00:04.000
First subtitle.

00:00:05.000 --> 00:00:08.000
Second subtitle.
```

React:

```jsx
<PortfolioVideo
  src="/media/k-town-noir/master.m3u8"
  subtitles={[
    {
      src: "/subtitles/k-town-noir.en.vtt",
      lang: "en",
      label: "English",
      default: true,
    },
  ]}
/>
```

Multiple languages:

```jsx
subtitles={[
  {
    src: "/subtitles/k-town-noir.en.vtt",
    lang: "en",
    label: "English",
    default: true,
  },
  {
    src: "/subtitles/k-town-noir.fr.vtt",
    lang: "fr",
    label: "Français",
  },
]}
```

### Why not enable Jellyfin subtitle manifests right now?

Jellyfin's current dynamic-HLS implementation can put an `ApiKey` query parameter into generated subtitle-playlist URLs.

For a public portfolio, that is undesirable because playlists are browser-visible.

Therefore the safer/simple setup is:

```text
Jellyfin video/audio HLS
+
website-hosted WebVTT subtitles
```

instead of exposing Jellyfin's subtitle manifest.

---

# hls.js client settings

The Apache/Jellyfin query parameters control the **server transcode**.

`hls.js` settings control the **browser player**.

A few options you may experiment with:

```jsx
const hls = new Hls({
  enableWorker: true,
  maxBufferLength: 30,
  backBufferLength: 30,
});
```

Useful debugging events:

```jsx
hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
  console.log("Manifest:", data);
});

hls.on(Hls.Events.LEVEL_SWITCHED, (_event, data) => {
  console.log("Level:", data.level);
});

hls.on(Hls.Events.ERROR, (_event, data) => {
  console.error("HLS error:", data);
});
```

The current setup is mainly requesting one very high-quality transcode. Do not assume that a file named `master.m3u8` automatically means you have a complete 4K/1080p/720p adaptive-bitrate ladder.

Stick with hls.js defaults unless there is a specific playback problem you are solving.

---

# Adding a new portfolio video

1. Put the video in the Jellyfin library.
2. Let Jellyfin scan it.
3. Open its details page.
4. Copy the `id=` value.
5. Pick a lowercase URL slug.
6. Add one line to:

```text
/SD_NAS/data/SERVER_RESOURCES/Websites/sirdanieliii-media.map
```

Example:

```text
new-short-film 0123456789abcdef0123456789abcdef
```

7. Test:

```bash
curl -s   https://sirdanieliii.ca/media/new-short-film/master.m3u8   | head
```

8. Use in React:

```jsx
<JellyfinPortfolioVideo slug="new-short-film" />
```

---

# Troubleshooting

## `mediaSourceId field is required`

Make sure the master rewrite contains:

```text
MediaSourceId=${PortfolioMedia:$1}
```

## 403 Forbidden

Check that:

- the slug is in `sirdanieliii-media.map`;
- Apache can read the map;
- the URL is exactly `/media/<slug>/master.m3u8`;
- the generic proxy rules are before the catch-all `/media/` block.

## Apache fails to reload

Run:

```bash
sudo apachectl configtest
```

Do not reload until it says:

```text
Syntax OK
```

Useful logs:

```text
/var/log/apache2/sirdanieliii.ca-error.log
/var/log/apache2/sirdanieliii.ca-access.log
```

## Playback buffers

Possible bottlenecks include:

- upload bandwidth;
- source/Samba I/O;
- Jellyfin transcode cache I/O;
- GPU encode speed;
- client connection speed;
- the requested 40 Mbps output.

Try lowering:

```text
VideoBitrate=40000000
```

to:

```text
VideoBitrate=25000000
```

and compare visual quality.

---

# Security notes

The portfolio browser sees:

```text
/media/k-town-noir/master.m3u8
```

It does **not** need:

- the Jellyfin hostname;
- Jellyfin credentials;
- the Jellyfin item ID;
- the Samba path.

The catch-all:

```apache
RewriteRule "^/media/" "-" [F,L]
```

is important because it keeps `/media/` from becoming a generic Jellyfin proxy.

The API token must remain server-side.

Do not put it in:

```text
React source
VITE_*
REACT_APP_*
frontend .env values
query strings
Git
```

Remember that `controlsList="nodownload"` is only a UI hint. It is not copy protection.

---

# Maintenance after Jellyfin upgrades

This setup directly uses Jellyfin's dynamic HLS endpoints and query parameters rather than implementing Jellyfin's full `PlaybackInfo` / client-capability negotiation.

That makes it simple and useful for a controlled portfolio, but potentially more version-sensitive.

After a major Jellyfin update:

1. Test one stream with `curl`.
2. Confirm `master.m3u8` starts with `#EXTM3U`.
3. Confirm playback works in React/hls.js.
4. Confirm Jellyfin reports **Transcoding**.
5. Confirm `.ts` segments load.
6. Confirm unapproved `/media/` paths still return an error.
7. Confirm no API token appears in browser-visible playlist URLs.

If something changes, inspect Jellyfin's current transcoding logs/API behavior instead of blindly adding query parameters.

---

# References

Apache RewriteMap:

https://httpd.apache.org/docs/2.4/rewrite/rewritemap.html

Jellyfin transcoding:

https://jellyfin.org/docs/general/post-install/transcoding/

Jellyfin hardware acceleration:

https://jellyfin.org/docs/general/post-install/transcoding/hardware-acceleration/

Jellyfin Dynamic HLS implementation:

https://github.com/jellyfin/jellyfin/blob/master/Jellyfin.Api/Helpers/DynamicHlsHelper.cs

hls.js:

https://github.com/video-dev/hls.js

hls.js API:

https://github.com/video-dev/hls.js/blob/master/docs/API.md
