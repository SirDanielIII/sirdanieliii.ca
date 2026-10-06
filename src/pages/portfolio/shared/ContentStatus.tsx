import {GalleryMessage} from '../../../css/portfolio/shared/PortfolioTypography.styles';

export default function ContentStatus({status, retry}: {status: 'loading' | 'ready' | 'error'; retry: () => void}) {
    return <GalleryMessage role="status">
        <p>{status === 'error' ? 'This collection could not be loaded.' : 'Loading collection…'}</p>
        {status === 'error' && <button type="button" onClick={retry}>Try again</button>}
    </GalleryMessage>;
}
