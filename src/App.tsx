// src/App.tsx
import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router';
import styled, {ThemeProvider} from 'styled-components';
import {GlobalStyles} from './styles/GlobalStyles';
import {darkTheme, lightTheme} from './styles/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import PortfolioPage from './pages/PortfolioPage';
import MerchPage from './pages/MerchPage';
import GuidesPage from './pages/GuidesPage';
import NotFoundPage from './pages/NotFoundPage';
import profileImage from './assets/images/profile.webp';
import TestPage from "./pages/TestPage.tsx";
import CookieNotice from './components/CookieNotice';
import ScrollToTop from './components/ScrollToTop';
import {getSavedTheme, hasVisitedBefore, markAsVisited, saveTheme, type SavedTheme} from './utils/cookies';

const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

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

                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/projects/" element={<ProjectsPage/>}/>
                    <Route path="/portfolio/" element={<PortfolioPage/>}/>
                    <Route path="/merch/" element={<MerchPage/>}/>
                    <Route path="/guides/" element={<GuidesPage/>}/>
                    <Route path="/test/" element={<TestPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
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
