import {useState} from 'react';
import {Thumb, PhotoButton} from '../../css/home/PhotoItem.styles';
import PhotoViewer from '../portfolio/PhotoViewer';
import type {Photo} from '../portfolio/photography';
import {useJson} from '../../shared/media/useJson';

export default function PhotoItem({src, alt, photoUrl}: {src: string; alt: string; photoUrl: string}) {
    const {data, status, retry} = useJson<Photo>(photoUrl);
    const [opener, setOpener] = useState<HTMLButtonElement | null>(null);
    return <>
        <PhotoButton type="button" aria-label={`View ${alt}`} aria-haspopup="dialog" disabled={!data}
            onClick={event => { setOpener(event.currentTarget); }}>
            <Thumb src={data?.preview_src ?? src} alt={data?.alt ?? alt} loading="lazy" decoding="async" />
        </PhotoButton>
        {status === 'error' && <p role="status">Photo information could not be loaded. <button type="button" onClick={retry}>Try again</button></p>}
        {opener && data && <PhotoViewer items={[data]} index={0} opener={opener} onClose={() => { setOpener(null); }} />}
    </>;
}
