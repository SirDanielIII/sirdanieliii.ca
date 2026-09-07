import React, {useState} from 'react';
import {useTheme} from 'styled-components';
import {
    HeaderContainer,
    HeaderContent,
    LogoLink,
    LogoImg,
    LogoText,
    Nav,
    NavLink,
    ToggleButton,
    HeaderActions,
    HamburgerButton,
    MobileMenuContainer,
    MobileMenuList,
} from '../../css/layout/Header.styles';

// Desktop and mobile menus share the same destinations and theme colours.
const navigation = [
    {to: '/projects', label: 'PROJECTS', accent: 'highlight2'},
    {to: '/portfolio', label: 'PORTFOLIO', accent: 'highlight3'},
    {to: '/merch', label: 'MERCH', accent: 'highlight4'},
    {to: '/guides', label: 'GUIDES', accent: 'highlight5'},
] as const;

interface HeaderProps {
    toggleTheme: () => void;
    profileImage: string;
}

const Header: React.FC<HeaderProps> = ({toggleTheme, profileImage}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const theme = useTheme();
    const isDarkMode = theme.mode === 'dark';

    return (
        <HeaderContainer>
            <HeaderContent>
                <LogoLink to="/">
                    <LogoImg src={profileImage} alt="Profile"/>
                    <LogoText>SIR DANIEL III</LogoText>
                </LogoLink>
                <Nav>
                    {navigation.map(item => (
                        <NavLink key={item.to} to={item.to} $color={theme.colors[item.accent]}>{item.label}</NavLink>
                    ))}
                </Nav>
                <HeaderActions>
                    <ToggleButton onClick={toggleTheme} title="Toggle Theme">
                        {isDarkMode ? '🌞' : '🌛'}
                    </ToggleButton>
                    <HamburgerButton aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => {
                        setMenuOpen(previousValue => !previousValue);
                    }}>
                        ☰
                    </HamburgerButton>
                </HeaderActions>

                <MobileMenuContainer id="mobile-navigation" $open={menuOpen}>
                    <MobileMenuList>
                        {navigation.map(item => (
                            <NavLink key={item.to} to={item.to} $color={theme.colors[item.accent]} onClick={() => { setMenuOpen(false); }}>
                                {item.label}
                            </NavLink>
                        ))}
                    </MobileMenuList>
                </MobileMenuContainer>
            </HeaderContent>
        </HeaderContainer>
    );
};

export default Header;
