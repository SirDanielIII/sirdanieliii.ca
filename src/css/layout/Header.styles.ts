import {Link, NavLink as RouterNavLink} from 'react-router';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    background: ${({theme}) => theme.colors.header};
    z-index: 1000;
    box-shadow: 0 0 10px #000;
`;

export const HeaderContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
`;

export const HeaderActions = styled.div`
    display: flex;
    gap: 10px;
`;

/* Hamburger and Mobile Menu */
export const HamburgerButton = styled.button`
    display: none;
    width: 40px;
    height: 50px;
    background: ${({theme}) => theme.colors.text};
    color: ${({theme}) => theme.colors.header};
    border-radius: 8px;
    font-size: 24px;
    align-items: center;
    justify-content: center;
    border: none;

    @media (max-width: 720px) {
        display: flex;
    }
`;

export const MobileMenuContainer = styled.div<{ $open: boolean }>`
    display: ${({$open}) => ($open ? 'block' : 'none')};
    position: absolute;
    top: 80px;
    right: 20px;
    background: ${({theme}) => theme.colors.header};
    border-radius: 8px;
    padding: 10px;
`;

export const MobileMenuList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    a {
        font-size: 20px;
        font-weight: 400;
        letter-spacing: 3px;
        text-align: right;
    }
`;
