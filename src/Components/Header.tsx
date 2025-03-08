import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    background: ${({theme}) => theme.colors.header};
    z-index: 1000;
    filter: drop-shadow(0px 0px 10px black);
`;

const HeaderContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 16px;

    @media (max-width: 600px) {
        gap: 0; /* On mobile, just show the image */
    }
`;

const LogoImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`;

const LogoText = styled.div`
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 5px;
    color: ${({theme}) => theme.colors.highlight1};

    @media (max-width: 1000px) {
        display: none; /* Hide text on small screens */
    }
`;

const Nav = styled.nav`
    display: flex;
    gap: 2rem;

    @media (max-width: 720px) {
        display: none; /* Hide text on small screens */
    }
`;

const NavLink = styled(Link)<{color: string}>`
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 3px;
    color: ${({color}) => color};

    &:hover {
        opacity: 0.8;
    }
`;

const ToggleButton = styled.button`
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
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

/* Hamburger and Mobile Menu */
const HamburgerButton = styled.button`
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

const MobileMenuContainer = styled.div<{open: boolean}>`
  display: ${({open}) => (open ? 'block' : 'none')};
  position: absolute;
  top: 80px;
  right: 20px;
  background: ${({theme}) => theme.colors.header};
  border-radius: 8px;
  padding: 10px;
`;

const MobileMenuList = styled.div`
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

interface HeaderProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
    profileImage: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode, profileImage }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <HeaderContainer>
            <HeaderContent>
                <LogoLink to="/">
                    <LogoImg src={profileImage} alt="Profile" />
                    <LogoText>SIR DANIEL III</LogoText>
                </LogoLink>
                <Nav>
                    <NavLink to="/projects" color="#38C4E7">PROJECTS</NavLink>
                    <NavLink to="/portfolio" color="#AA9EEA">PORTFOLIO</NavLink>
                    <NavLink to="/merch" color="#3FD49A">MERCH</NavLink>
                    <NavLink to="/articles" color="#E9C683">ARTICLES</NavLink>
                </Nav>
                <div style={{display: 'flex', gap: '10px'}}>
                    <ToggleButton onClick={toggleTheme} title="Toggle Theme">
                        {isDarkMode ? '🌞' : '🌛'}
                    </ToggleButton>
                    <HamburgerButton onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                    </HamburgerButton>
                </div>

                <MobileMenuContainer open={menuOpen}>
                    <MobileMenuList>
                        <NavLink to="/projects" color="#38C4E7" onClick={() => setMenuOpen(false)}>PROJECTS</NavLink>
                        <NavLink to="/portfolio" color="#AA9EEA" onClick={() => setMenuOpen(false)}>PORTFOLIO</NavLink>
                        <NavLink to="/merch" color="#3FD49A" onClick={() => setMenuOpen(false)}>MERCH</NavLink>
                        <NavLink to="/articles" color="#E9C683" onClick={() => setMenuOpen(false)}>ARTICLES</NavLink>
                    </MobileMenuList>
                </MobileMenuContainer>
            </HeaderContent>
        </HeaderContainer>
    );
};

export default Header;
