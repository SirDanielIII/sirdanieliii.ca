import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router';
import App from './App';
import './styles/fonts.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Could not find the application root element.');
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
