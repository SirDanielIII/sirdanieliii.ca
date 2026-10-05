import {useState} from 'react';
import {Link, useLocation, useNavigate, useSearchParams} from 'react-router';
import {CollectionIntro, Eyebrow, Filters, GalleryMessage} from '../../css/portfolio/PortfolioPage.styles';
import {usePhotography} from './photography';
import PhotographyGallery from './PhotographyGallery';
import PhotoViewer from './PhotoViewer';

export default function PhotographySection() {
    const {data, status, retry} = usePhotography();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [opener, setOpener] = useState<HTMLButtonElement | null>(null);
    const viewerState = location.state as {photographyViewer?: boolean} | null;
    const requestedCategory = searchParams.get('category') ?? '';
    const category = data?.categories.find(item => item.id === requestedCategory);
    const activeCategory = category?.id ?? '';
    const filtered = data?.photos.filter(photo => !activeCategory || photo.category === activeCategory) ?? [];
    const requestedPhoto = searchParams.get('photo');
    // IDs are resolved against the manifest, never used as client-supplied filesystem paths.
    // A shared photo link still works if its category filter is missing or no longer matches.
    const viewerItems = filtered.some(photo => photo.id === requestedPhoto) ? filtered : data?.photos ?? [];
    const selectedIndex = viewerItems.findIndex(photo => photo.id === requestedPhoto);
    const openPhoto = (id: string, button?: HTMLButtonElement) => {
        if (button) setOpener(button);
        const next = new URLSearchParams(searchParams);
        next.set('photo', id);
        // One history entry per viewer session: Back closes it; Next/Previous update that entry.
        setSearchParams(next, {replace: Boolean(requestedPhoto), state: requestedPhoto ? viewerState : {photographyViewer: true}});
    };
    const closePhoto = () => {
        if (viewerState?.photographyViewer) {
            void navigate(-1);
        } else {
            // Closing a direct/shared URL must keep the visitor on Photography.
            const next = new URLSearchParams(searchParams);
            next.delete('photo');
            setSearchParams(next, {replace: true});
        }
    };
    const categoryUrl = (id: string) => {
        const next = new URLSearchParams(searchParams);
        next.delete('photo');
        if (id) next.set('category', id);
        else next.delete('category');
        return {search: next.size ? `?${next.toString()}` : ''};
    };

    return <>
        <CollectionIntro>
            <Eyebrow>01 / Photography</Eyebrow>
            <h1>Life, <em>in stills.</em></h1>
            <p>A favourite face. A familiar place. Something you might have walked past.<br />A collection of moments, one frame at a time.</p>
        </CollectionIntro>
        <Filters aria-label="Photography categories">
            <Link to={categoryUrl('')} aria-current={!activeCategory ? 'page' : undefined} aria-controls="photo-gallery">All work</Link>
            {data?.categories.map(item => <Link key={item.id} to={categoryUrl(item.id)} aria-current={activeCategory === item.id ? 'page' : undefined} aria-controls="photo-gallery">
                {item.title}{item.status === 'coming-soon' && <small>· Coming Soon</small>}
            </Link>)}
            <span role="status">{status === 'loading' ? 'Loading photography…' : status === 'error' ? 'Photography unavailable' : category?.status === 'coming-soon' ? 'Coming Soon' : `${String(filtered.length)} photographs`}</span>
        </Filters>
        {status === 'ready' && requestedCategory && !category && <GalleryMessage><p>This category was not found. Showing all work.</p></GalleryMessage>}
        {status === 'ready' && requestedPhoto && selectedIndex < 0 && <GalleryMessage role="status"><p>This photograph is no longer available.</p><button type="button" onClick={closePhoto}>Return to gallery</button></GalleryMessage>}
        <PhotographyGallery key={activeCategory} items={filtered} category={category} status={status} retry={retry} onOpen={openPhoto} />
        {selectedIndex >= 0 && <PhotoViewer items={viewerItems} index={selectedIndex} opener={opener} onNavigate={openPhoto} onClose={closePhoto} />}
    </>;
}
