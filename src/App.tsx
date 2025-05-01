// src/App.tsx
import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom';
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
import profileImage from './assets/images/profile.webp';

// 1) Make your app a column flex container
const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

// 2) Let the content area grow
const MainContent = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return (
        <ThemeProvider theme={currentTheme}>
            <GlobalStyles/>
            <AppWrapper>
                <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} profileImage={profileImage}/>
                <MainContent>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/projects" element={<ProjectsPage isDarkMode={isDarkMode}/>}/>
                        <Route path="/portfolio" element={<PortfolioPage/>}/>
                        <Route path="/merch" element={<MerchPage/>}/>
                        <Route path="/guides" element={<GuidesPage/>}/>
                    </Routes>
                </MainContent>
                <Footer/>
            </AppWrapper>
        </ThemeProvider>
    );
};

export default App;
