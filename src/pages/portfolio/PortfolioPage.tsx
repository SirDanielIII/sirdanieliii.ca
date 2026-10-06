import {Route, Routes} from 'react-router';
import NotFoundPage from '../not-found/NotFoundPage';
import PhotographySection from './photography/PhotographySection';
import VideographySection from './videography/VideographySection';
import ShortFilmsSection from './films/ShortFilmsSection';
import PortfolioOverview from './overview/PortfolioOverview';
import PortfolioLayout from './layout/PortfolioLayout';
import {PortfolioContext, isPortfolioContent} from './shared/portfolio';
import {useJson} from '../../shared/media/useJson';
import ContentStatus from './shared/ContentStatus';
import {Page} from '../../css/portfolio/layout/PortfolioLayout.styles';

export default function PortfolioPage() {
    const {data, status, retry} = useJson('/portfolio/portfolio.json', isPortfolioContent);
    if (!data) return <Page><ContentStatus status={status} retry={retry} /></Page>;
    return <PortfolioContext value={data}><Routes>
        <Route index element={<PortfolioOverview />} />
        <Route path="photography" element={<PortfolioLayout medium="photography"><PhotographySection /></PortfolioLayout>} />
        <Route path="videography" element={<PortfolioLayout medium="videography"><VideographySection /></PortfolioLayout>} />
        <Route path="short-films" element={<PortfolioLayout medium="short-films"><ShortFilmsSection /></PortfolioLayout>} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes></PortfolioContext>;
}
