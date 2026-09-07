import {Link} from 'react-router';
import styled from 'styled-components';

export const Page = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 8.25rem 1.5rem 4.5rem;

    @media (max-width: 600px) { padding: 7rem 1rem 3rem; }
`;

export const Intro = styled.div`
    max-width: 44rem;
    margin-bottom: 2.5rem;
    h1 {
        color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight5 : '#85601e'};
        font-size: clamp(2.5rem, 7vw, 4.5rem);
        font-weight: 400;
        letter-spacing: 0.08em;
    }
    p { margin-top: 1rem; font-size: 1.15rem; line-height: 1.6; opacity: 0.8; }
`;

export const LibraryTools = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1.25rem;
    padding: 1.25rem 0;
    border-block: 1px solid ${({theme}) => theme.mode === 'dark' ? '#35332c' : '#ddd7cc'};
`;

export const Search = styled.label`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: min(100%, 23rem);
    padding: 0.75rem 1rem;
    border: 1px solid ${({theme}) => theme.mode === 'dark' ? '#4a4438' : '#c8baa3'};
    border-radius: 9px;
    background: ${({theme}) => theme.colors.background2};
    svg { width: 1.2rem; height: 1.2rem; flex-shrink: 0; }
    input {
        min-width: 0;
        width: 100%;
        border: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        outline: none;
    }
    input::placeholder { color: inherit; opacity: 0.6; }
    &:focus-within { outline: 3px solid ${({theme}) => theme.colors.highlight5}; outline-offset: 3px; }
`;

export const CategoryList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

export const CategoryButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 42px;
    padding: 0.55rem 0.8rem;
    border: 1px solid transparent;
    border-radius: 7px;
    color: ${({theme}) => theme.colors.text};
    span { font-size: 0.8rem; opacity: 0.65; }
    &[aria-pressed='true'] {
        background: ${({theme}) => theme.colors.highlight5};
        color: #2a2113;
    }
    &:hover { border-color: ${({theme}) => theme.colors.highlight5}; }
    &:focus-visible { outline: 3px solid ${({theme}) => theme.colors.highlight5}; outline-offset: 3px; }
`;

export const ResultCount = styled.p`
    margin: 1.5rem 0;
    font-size: 0.95rem;
    opacity: 0.7;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
    @media (max-width: 1000px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    @media (max-width: 650px) { grid-template-columns: minmax(0, 1fr); }
`;

export const GuideLink = styled(Link)`
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 23rem;
    padding: clamp(1.35rem, 3vw, 2rem);
    border: 1px solid ${({theme}) => theme.mode === 'dark' ? '#423b2e' : '#d9ccb6'};
    border-radius: 16px;
    background: ${({theme}) => theme.mode === 'dark'
        ? 'linear-gradient(145deg, #262219, #171717 65%)'
        : 'linear-gradient(145deg, #fff5e0, #ffffff 65%)'};
    transition: transform 0.2s ease, border-color 0.2s ease;
    h2 { margin-top: 1.5rem; font-size: 1.8rem; font-weight: 400; line-height: 1.3; overflow-wrap: anywhere; }
    p { margin: 0.9rem 0 1.25rem; line-height: 1.65; opacity: 0.8; }
    &:hover { transform: translateY(-4px); border-color: ${({theme}) => theme.colors.highlight5}; }
    &:focus-visible { outline: 3px solid ${({theme}) => theme.colors.highlight5}; outline-offset: 4px; }
    @media (prefers-reduced-motion: reduce) { transition: none; &:hover { transform: none; } }
`;

export const CardCategory = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight5 : '#85601e'};
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    svg { width: 1.5rem; height: 1.5rem; }
`;

export const Tags = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    list-style: none;
    li {
        padding: 0.25rem 0.55rem;
        border-radius: 5px;
        background: ${({theme}) => theme.mode === 'dark' ? '#302d25' : '#f0e9dc'};
        font-size: 0.8rem;
        line-height: 1.4;
    }
`;

export const CardFooter = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-top: auto;
    padding-top: 1.5rem;
    span:first-child { font-size: 0.85rem; opacity: 0.65; }
    span:last-child { color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight5 : '#85601e'}; }
`;

export const EmptyState = styled.div`
    padding: 4rem 1rem;
    text-align: center;
    h2 { font-size: 1.8rem; font-weight: 400; }
    p { margin: 1rem 0 1.5rem; line-height: 1.6; opacity: 0.75; }
`;

export const ActionButton = styled.button`
    min-height: 44px;
    padding: 0.65rem 1rem;
    border: 1px solid ${({theme}) => theme.colors.highlight5};
    border-radius: 8px;
    color: ${({theme}) => theme.colors.text};
    &:hover { background: ${({theme}) => theme.colors.highlight5}; color: #2a2113; }
    &:focus-visible { outline: 3px solid ${({theme}) => theme.colors.highlight5}; outline-offset: 3px; }
`;
