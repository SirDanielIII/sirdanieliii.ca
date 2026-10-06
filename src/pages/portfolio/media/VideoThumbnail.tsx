import {useState} from 'react';
import {VideoPoster} from '../../../css/portfolio/media/Media.styles';
import type {WatchableWork} from './media';
import type {OpenVideo} from './useMediaViewer';

export default function VideoThumbnail({work, onOpen, eager = false}: {work: WatchableWork; onOpen: OpenVideo; eager?: boolean}) {
    const [failed, setFailed] = useState(false);
    const image = work.thumbnail;
    const artwork = <>
        {image && !failed ? <img src={image.previewSrc ?? image.src} alt={image.alt} width={image.width} height={image.height}
            loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} onError={() => { setFailed(true); }} />
            : <span className="media-placeholder">{failed ? 'Image unavailable' : work.title}</span>}
        {work.video && <span className="play" aria-hidden="true">▶</span>}
    </>;
    if (!work.video) return <VideoPoster as="div">{artwork}</VideoPoster>;
    return <VideoPoster type="button" aria-label={`Play ${work.title}`}
        onClick={event => { onOpen(work, event.currentTarget); }}>
        {artwork}
    </VideoPoster>;
}
