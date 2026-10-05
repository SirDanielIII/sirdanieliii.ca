import {useState} from 'react';

export interface ViewerImageSource {
    src: string;
    alt: string;
    width?: number | null;
    height?: number | null;
}

/** Full originals only. No EXIF/sidecar requests; the surrounding viewer supplies its copy. */
export default function ViewerImage({image, noun = 'image'}: {image: ViewerImageSource; noun?: string}) {
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [attempt, setAttempt] = useState(0);
    return (
        <div className="viewer-image" aria-busy={status === 'loading'}>
            {status !== 'error' && <img
                key={attempt}
                src={image.src}
                alt={image.alt}
                width={image.width ?? undefined}
                height={image.height ?? undefined}
                data-loading={status === 'loading'}
                aria-hidden={status === 'loading' ? true : undefined}
                decoding="async"
                fetchPriority="high"
                onLoad={event => {
                    const element = event.currentTarget;
                    void element.decode().then(
                        () => { if (element.isConnected) setStatus('ready'); },
                        () => { if (element.isConnected) setStatus('error'); },
                    );
                }}
                onError={() => { setStatus('error'); }}
            />}
            {status === 'loading' && <>
                <span className="viewer-placeholder" aria-hidden="true" />
                <span className="viewer-loading" role="status">Loading {noun}…</span>
            </>}
            {status === 'error' && <div className="viewer-error">
                <p role="status">The full {noun} could not be loaded.</p>
                <button type="button" onClick={() => { setStatus('loading'); setAttempt(value => value + 1); }}>Try again</button>
            </div>}
        </div>
    );
}
