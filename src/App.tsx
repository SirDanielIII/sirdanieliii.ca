import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {GlobalStyles} from './styles/GlobalStyles';
import {darkTheme, lightTheme} from './styles/theme';

import Header from './Components/Header';
import Footer from './Components/Footer';

import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import PortfolioPage from './pages/PortfolioPage';
import MerchPage from './pages/MerchPage';
import ArticlesPage from './pages/ArticlesPage';

import profileImage from './assets/images/profile.png';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return (
        <ThemeProvider theme={currentTheme}>
            <GlobalStyles/>
            <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} profileImage={profileImage}/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/projects" element={<ProjectsPage/>}/>
                <Route path="/portfolio" element={<PortfolioPage/>}/>
                <Route path="/merch" element={<MerchPage/>}/>
                <Route path="/articles" element={<ArticlesPage/>}/>
            </Routes>
            <Footer profileImage={profileImage}/>
        </ThemeProvider>
    );
};

export default App;
