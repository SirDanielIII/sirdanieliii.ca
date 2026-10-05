import {Link, NavLink as RouterNavLink} from 'react-router';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    background: ${({theme}) => theme.colors.header};
    z-index: 1000;
    border-bottom: 1px solid ${({theme}) => theme.portfolioBase.border};
    box-shadow: 0 4px 24px #0000000a;
    :is(a, button):focus-visible {
        outline: 2px solid ${({theme}) => theme.portfolioBase.accent};
        outline-offset: 4px;
    }
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { transition: none !important; animation: none !important; }
    }
`;

export const HeaderContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 720px) { height: 72px; padding: 0 1rem; }
`;

export const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 16px;

    @media (max-width: 600px) {
        gap: 0; /* On mobile, just show the image */
    }
`;

export const LogoImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    @media (max-width: 720px) { width: 44px; height: 44px; }
`;

export const LogoText = styled.div`
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 5px;
    color: ${({theme}) => theme.colors.highlight1};

    @media (max-width: 1000px) {
        display: none; /* Hide text on small screens */
    }
`;

export const Nav = styled.nav`
    display: flex;
    gap: 1rem;

    @media (max-width: 720px) {
        display: none; /* Hide text on small screens */
    }
`;

export const NavLink = styled(RouterNavLink)<{ $color: string }>`
    padding: 8px;
    border-radius: 6px;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: ${({$color}) => $color};
    background-color: transparent;
    transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;

    &[aria-current='page'] {
        background-color: ${({$color}) => $color};
        color: #121212;
    }

    &:hover {
        opacity: 0.8;
    }
`;

export const ToggleButton = styled.button`
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: ${({theme}) => theme.colors.themeButton};
    color: ${({theme}) => theme.colors.header};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;

    &:hover {
        opacity: 0.8;
    }
    @media (max-width: 720px) { width: 48px; height: 48px; font-size: 22px; }
`;

export const HeaderActions = styled.div`
    display: flex;
    gap: 10px;
`;

/* Mobile disclosure: a clear 48px target and a menu icon that becomes Close. */
export const HamburgerButton = styled.button`
    display: none;
    min-width: 104px;
    min-height: 48px;
    padding: 0.6rem 0.85rem;
    gap: 0.65rem;
    background: transparent;
    color: ${({theme}) => theme.colors.text};
    border: 1px solid ${({theme}) => theme.portfolioBase.border};
    border-radius: 0.6rem;
    font-size: 0.9rem;
    align-items: center;
    justify-content: center;
    transition: background-color 0.18s ease, border-color 0.18s ease;
    &:hover, &[aria-expanded='true'] {
        background: ${({theme}) => theme.portfolioBase.surface};
        border-color: ${({theme}) => theme.portfolioBase.accent};
    }
    .menu-icon { position: relative; width: 22px; height: 22px; flex-shrink: 0; }
    .menu-icon span {
        position: absolute;
        left: 0;
        top: 10px;
        width: 22px;
        height: 2px;
        border-radius: 1px;
        background: currentColor;
        transition: transform 0.18s ease, opacity 0.18s ease;
    }
    .menu-icon span:first-child { transform: translateY(-7px); }
    .menu-icon span:last-child { transform: translateY(7px); }
    &[aria-expanded='true'] .menu-icon span:first-child { transform: rotate(45deg); }
    &[aria-expanded='true'] .menu-icon span:nth-child(2) { opacity: 0; }
    &[aria-expanded='true'] .menu-icon span:last-child { transform: rotate(-45deg); }

    @media (max-width: 720px) {
        display: flex;
    }
`;

export const MobileMenuContainer = styled.nav`
    &[hidden] { display: none; }
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: calc(100dvh - 73px);
    overflow-y: auto;
    overscroll-behavior: contain;
    background: ${({theme}) => theme.colors.header};
    border-bottom: 1px solid ${({theme}) => theme.portfolioBase.border};
    box-shadow: 0 18px 28px #00000018;
    padding: 0.75rem 1rem max(1.25rem, env(safe-area-inset-bottom));
    @media (min-width: 721px) { display: none; }
`;

export const MobileMenuList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    list-style: none;
    max-width: 40rem;
    margin: 0 auto;
`;

export const MobileNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 60px;
    padding: 0.9rem 1.1rem;
    border-radius: 0.4rem;
    font-size: 1.25rem;
    letter-spacing: 0.01em;
    text-transform: none;
    color: ${({theme}) => theme.colors.text};
    svg { width: 18px; height: 18px; opacity: 0.6; flex-shrink: 0; }
    &[aria-current='page'] {
        background: ${({theme}) => theme.portfolioBase.surface};
        color: ${({theme}) => theme.colors.text};
        box-shadow: inset 3px 0 0 ${({$color}) => $color};
    }
    &:hover { opacity: 1; background: ${({theme}) => theme.portfolioBase.surface}; }
`;
