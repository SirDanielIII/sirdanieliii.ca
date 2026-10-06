import {useState} from 'react';
import {VideoPoster} from '../../../css/portfolio/media/Media.styles';
import type {WatchableWork} from './media';
import type {OpenTrailer, OpenVideo} from './useMediaViewer';

export default function VideoThumbnail({work, onOpen, onTrailer, eager = false}: {work: WatchableWork; onOpen: OpenVideo; onTrailer?: OpenTrailer; eager?: boolean}) {
    const [failed, setFailed] = useState(false);
    const image = work.thumbnail;
    const trailerFilm = !work.video && 'trailer' in work && work.trailer && onTrailer ? work : null;
    const playable = Boolean(work.video ?? trailerFilm);
    const artwork = <>
        {image && !failed ? <img src={image.src} alt={image.alt} width={image.width} height={image.height}
            loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} onError={() => { setFailed(true); }} />
            : <span className="media-placeholder">{failed ? 'Image unavailable' : work.title}</span>}
        {playable && <span className="play" aria-hidden="true">▶</span>}
    </>;
    if (!playable) return <VideoPoster as="div">{artwork}</VideoPoster>;
    return <VideoPoster type="button" aria-label={trailerFilm ? `Play trailer for ${work.title}` : `Play ${work.title}`}
        onClick={event => {
            if (trailerFilm && onTrailer) onTrailer(trailerFilm, event.currentTarget);
            else onOpen(work, event.currentTarget);
        }}>
        {artwork}
    </VideoPoster>;
}
