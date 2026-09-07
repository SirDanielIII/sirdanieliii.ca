import {Route, Routes} from 'react-router';
import GuidesPage from './GuidesPage';
import GuideArticle from './GuideArticle';

const GuidesRoutes = () => (
    <Routes>
        <Route index element={<GuidesPage/>}/>
        <Route path="*" element={<GuideArticle/>}/>
    </Routes>
);

export default GuidesRoutes;
