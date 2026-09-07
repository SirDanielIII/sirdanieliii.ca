import React, {lazy, Suspense, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router';
import {ThemeProvider} from 'styled-components';
import {GlobalStyles} from './css/GlobalStyles';
import {darkTheme, lightTheme} from './css/theme';
import Header from './shared/layout/Header';
import Footer from './shared/layout/Footer';
import HomePage from './pages/home/HomePage';
import GuidesPage from './pages/guides/GuidesPage';
import NotFoundPage from './pages/not-found/NotFoundPage';
import profileImage from './assets/images/profile.webp';
import TestPage from './pages/test/TestPage';
import CookieNotice from './shared/feedback/CookieNotice';
import ScrollToTop from './shared/navigation/ScrollToTop';
import {getSavedTheme, hasVisitedBefore, markAsVisited, saveTheme, type SavedTheme} from './utils/cookies';
import {AppWrapper, RouteLoading} from './css/App.styles';

const ProjectsPage = lazy(() => import('./pages/projects/ProjectsPage'));
const PortfolioPage = lazy(() => import('./pages/portfolio/PortfolioPage'));
const MerchPage = lazy(() => import('./pages/merch/MerchPage'));

const App: React.FC = () => {
    const [colourMode, setColourMode] = useState<SavedTheme>(() => getSavedTheme() ?? 'dark');
    const [showCookieNotice, setShowCookieNotice] = useState(() => !hasVisitedBefore());
    const currentTheme = colourMode === 'dark' ? darkTheme : lightTheme;

    useEffect(() => {
        saveTheme(colourMode);
    }, [colourMode]);

    useEffect(() => {
        if (showCookieNotice) {
            markAsVisited();
        }
    }, [showCookieNotice]);

    const toggleTheme = () => {
        setColourMode(previousMode => previousMode === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeProvider theme={currentTheme}>
            <GlobalStyles/>
            <ScrollToTop/>
            <AppWrapper>
                <Header toggleTheme={toggleTheme} profileImage={profileImage}/>

                <Suspense fallback={<RouteLoading role="status">Loading page…</RouteLoading>}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/projects/" element={<ProjectsPage/>}/>
                        <Route path="/portfolio/" element={<PortfolioPage/>}/>
                        <Route path="/merch/" element={<MerchPage/>}/>
                        <Route path="/guides/" element={<GuidesPage/>}/>
                        <Route path="/test/" element={<TestPage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </Suspense>
                <Footer/>
            </AppWrapper>
            {showCookieNotice && (
                <CookieNotice onDismiss={() => {
                    setShowCookieNotice(false);
                }}/>
            )}
        </ThemeProvider>
    );
};

export default App;
