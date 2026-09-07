import {Link} from 'react-router';
import styled, {createGlobalStyle} from 'styled-components';

export const ArticlePage = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1160px;
    margin: 0 auto;
    padding: 7.5rem 1.5rem 4.5rem;
    @media (max-width: 600px) { padding: 7rem 1rem 3rem; }
    @media print { padding: 0; max-width: none; }
`;

export const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight5 : '#85601e'};
    &:hover { text-decoration: underline; text-underline-offset: 0.25em; }
    &:focus-visible { outline: 3px solid ${({theme}) => theme.colors.highlight5}; outline-offset: 3px; }
`;

export const ArticleIntro = styled.div`
    max-width: 52rem;
    margin: 1.25rem 0 2rem;
    > span { color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight5 : '#85601e'}; letter-spacing: 0.12em; text-transform: uppercase; font-size: 0.85rem; }
    h1 { margin: 0.75rem 0 1rem; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 400; line-height: 1.25; overflow-wrap: anywhere; }
    > p { max-width: 44rem; font-size: 1.2rem; line-height: 1.65; opacity: 0.8; }
`;

export const ArticleMeta = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem 1.5rem;
    margin-top: 1.5rem;
    list-style: none;
    font-size: 0.95rem;
    line-height: 1.5;
    opacity: 0.7;
`;

export const ArticleLayout = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 14rem;
    align-items: start;
    gap: clamp(2rem, 5vw, 4.5rem);
    border-top: 1px solid ${({theme}) => theme.mode === 'dark' ? '#38342c' : '#dcd4c7'};
    padding-top: 2rem;
    @media (max-width: 850px) { grid-template-columns: minmax(0, 1fr); gap: 2rem; }
    @media print { display: block; border: 0; padding: 0; }
`;

export const Prose = styled.article`
    min-width: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 1.02rem;
    line-height: 1.8;
    overflow-wrap: anywhere;
    > :first-child { margin-top: 0; }
    h2, h3, h4 {
        scroll-margin-top: 110px;
        font-family: ${({theme}) => theme.fonts.regular};
        font-weight: 400;
        line-height: 1.3;
    }
    h2 { margin: 2.75rem 0 1rem; font-size: 1.85rem; color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight5 : '#85601e'}; }
    h3 { margin: 2rem 0 0.75rem; font-size: 1.4rem; }
    p, ul, ol, blockquote, pre, table { margin: 1rem 0; }
    ul, ol { padding-left: 1.5rem; }
    li { padding-left: 0.3rem; margin: 0.5rem 0; }
    li::marker { color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight5 : '#85601e'}; font-weight: 600; }
    li > p { margin: 0.35rem 0; }
    li > ul, li > ol { margin: 0.5rem 0; }
    strong { font-weight: 650; }
    a { color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight5 : '#795215'}; text-decoration: underline; text-underline-offset: 0.2em; }
    a:focus-visible { outline: 3px solid ${({theme}) => theme.colors.highlight5}; outline-offset: 3px; }
    blockquote { padding: 0.2rem 1.25rem; border-left: 3px solid ${({theme}) => theme.colors.highlight5}; opacity: 0.85; }
    code { padding: 0.15rem 0.35rem; border-radius: 4px; background: ${({theme}) => theme.mode === 'dark' ? '#282622' : '#eee8df'}; font-size: 0.9em; }
    pre { max-width: 100%; padding: 1.25rem; overflow-x: auto; border-radius: 10px; background: ${({theme}) => theme.mode === 'dark' ? '#24221f' : '#eee8df'}; }
    pre code { padding: 0; background: transparent; white-space: pre; }
    img { display: block; max-width: 100%; height: auto; border-radius: 10px; margin: 1.5rem 0; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th, td { padding: 0.7rem; border-bottom: 1px solid ${({theme}) => theme.mode === 'dark' ? '#464037' : '#d7caba'}; }
    th { background: ${({theme}) => theme.mode === 'dark' ? '#28241d' : '#f4ecdd'}; }
    hr { margin: 2rem 0; border: 0; border-top: 1px solid #8886; }
    input[type='checkbox'] { margin-right: 0.5rem; }
    @media print { font-size: 10pt; line-height: 1.6; h2, h3 { break-after: avoid; } pre { white-space: pre-wrap; } }
`;

export const ArticleSidebar = styled.aside`
    position: sticky;
    top: 110px;
    nav { margin: 1.5rem 0; }
    h2 { margin-bottom: 0.75rem; font-size: 1rem; font-weight: 400; }
    ol { display: grid; gap: 0.65rem; padding: 0; list-style: none; }
    a { display: block; font-size: 0.95rem; line-height: 1.5; opacity: 0.8; }
    a:hover { color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight5 : '#85601e'}; opacity: 1; }
    a:focus-visible { outline: 3px solid ${({theme}) => theme.colors.highlight5}; outline-offset: 3px; }
    @media (max-width: 850px) { position: static; grid-row: 1; nav { margin-bottom: 0; } ol { display: flex; flex-wrap: wrap; gap: 0.75rem 1.25rem; } }
`;

export const CalloutBox = styled.aside`
    margin: 1.75rem 0;
    padding: 1rem 1.25rem;
    border-left: 3px solid ${({theme}) => theme.colors.highlight5};
    border-radius: 0 10px 10px 0;
    background: ${({theme}) => theme.mode === 'dark' ? '#27231c' : '#f6edda'};
    font-size: 0.95rem;
    > strong { display: block; }
    > :last-child { margin-bottom: 0; }
    p { margin: 0.5rem 0; }
`;

export const TableScroll = styled.div`
    width: 100%;
    overflow-x: auto;
    @media print { overflow: visible; }
`;

export const Related = styled.section`
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid ${({theme}) => theme.mode === 'dark' ? '#38342c' : '#dcd4c7'};
    h2 { font-size: 1.2rem; font-weight: 400; margin-bottom: 0.75rem; }
    a { display: block; margin: 0.6rem 0; text-decoration: underline; text-underline-offset: 0.2em; line-height: 1.5; }
`;

export const PrintStyles = createGlobalStyle`
    @media print {
        header, footer, [data-print-hidden], #root > aside[role='status'] { display: none !important; }
        body, #root { background: white !important; color: black !important; }
        body * { background: transparent !important; color: black !important; box-shadow: none !important; text-shadow: none !important; }
        a { text-decoration: none !important; }
    }
`;
