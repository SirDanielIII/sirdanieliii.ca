import {useEffect, useRef, useState} from 'react';
import type Hls from 'hls.js';
import type {VideoSource} from './media';

function HlsPlayer({url, title, poster}: {url: string; title: string; poster?: string}) {
    const element = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const video = element.current;
        if (!video) return;
        let active = true;
        let hls: Hls | null = null;
        const play = () => { void video.play().catch(() => { /* Native controls handle autoplay restrictions. */ }); };
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            play();
        } else {
            // Loaded only after the visitor opens this player, with an unmount guard.
            void import('hls.js').then(({default: Hls}) => {
                if (!active) return;
                if (!Hls.isSupported()) {
                    setError('This browser cannot play this stream. Try a current browser.');
                    return;
                }
                hls = new Hls();
                hls.on(Hls.Events.ERROR, (_event, data) => {
                    if (active && data.fatal) {
                        hls?.destroy();
                        hls = null;
                        setError('The film could not be played. Please try again.');
                    }
                });
                hls.on(Hls.Events.MANIFEST_PARSED, play);
                hls.loadSource(url);
                hls.attachMedia(video);
            }).catch(() => {
                if (active) setError('The video player could not be loaded. Please try again.');
            });
        }
        return () => {
            active = false;
            hls?.destroy();
            video.pause();
            video.removeAttribute('src');
            video.load();
        };
    }, [url, attempt]);

    return <>
        <video ref={element} controls playsInline preload="none" poster={poster} aria-label={title}
            onError={() => { setError('The film could not be played. Please try again.'); }} />
        {error && <div className="player-error">
            <p role="alert">{error}</p>
            <button type="button" onClick={() => { setError(null); setAttempt(value => value + 1); }}>Try again</button>
        </div>}
    </>;
}

/** Only mounted inside an explicitly opened viewer; never on thumbnail/page mount. */
export default function PortfolioVideoPlayer({video, title, poster}: {video: VideoSource; title: string; poster?: string}) {
    return <div className="player-stage">
        {video.type === 'youtube'
            ? <iframe src={video.embedUrl} title={title} allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            : <HlsPlayer url={video.url} title={title} poster={poster} />}
    </div>;
}
