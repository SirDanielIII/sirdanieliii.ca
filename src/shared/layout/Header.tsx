import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router';
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
    MobileNavLink,
} from '../../css/layout/Header.styles';

// Desktop and mobile menus share the same destinations and theme colours.
const navigation = [
    {to: '/projects', label: 'Projects', accent: 'highlight2'},
    {to: '/portfolio', label: 'Portfolio', accent: 'highlight3'},
    {to: '/merch', label: 'Merch', accent: 'highlight4'},
    {to: '/guides', label: 'Guides', accent: 'highlight5'},
] as const;

interface HeaderProps {
    toggleTheme: () => void;
    profileImage: string;
}

const Header: React.FC<HeaderProps> = ({toggleTheme, profileImage}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const header = useRef<HTMLElement>(null);
    const menuButton = useRef<HTMLButtonElement>(null);
    const mobileNavigation = useRef<HTMLElement>(null);
    const desktopNavigation = useRef<HTMLElement>(null);
    const location = useLocation();
    const [menuLocation, setMenuLocation] = useState(location.key);
    const theme = useTheme();
    const isDarkMode = theme.mode === 'dark';

    // Reset before rendering a new route, including browser Back/Forward navigation.
    if (menuLocation !== location.key) {
        setMenuLocation(location.key);
        setMenuOpen(false);
    }

    useEffect(() => {
        if (!menuOpen) return;
        const onOutsidePointer = (event: PointerEvent) => {
            if (event.target instanceof Node && !header.current?.contains(event.target)) setMenuOpen(false);
        };
        const desktop = window.matchMedia('(min-width: 721px)');
        const onBreakpointChange = () => {
            if (!desktop.matches) return;
            const focusWasInMenu = mobileNavigation.current?.contains(document.activeElement) === true || document.activeElement === menuButton.current;
            setMenuOpen(false);
            if (focusWasInMenu) {
                const destination = desktopNavigation.current?.querySelector<HTMLAnchorElement>('a[aria-current="page"]')
                    ?? desktopNavigation.current?.querySelector<HTMLAnchorElement>('a');
                destination?.focus({preventScroll: true});
            }
        };
        document.addEventListener('pointerdown', onOutsidePointer);
        desktop.addEventListener('change', onBreakpointChange);
        return () => {
            document.removeEventListener('pointerdown', onOutsidePointer);
            desktop.removeEventListener('change', onBreakpointChange);
        };
    }, [menuOpen]);

    return (
        <HeaderContainer ref={header}
            onBlur={event => {
                if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false);
            }}
            onKeyDown={event => {
                if (menuOpen && event.key === 'Escape') {
                    event.preventDefault();
                    event.stopPropagation();
                    setMenuOpen(false);
                    menuButton.current?.focus({preventScroll: true});
                }
            }}>
            <HeaderContent>
                <LogoLink to="/">
                    <LogoImg src={profileImage} alt="Sir Daniel III avatar: an illustrated red-haired character in a red hat"/>
                    <LogoText>SIR DANIEL III</LogoText>
                </LogoLink>
                <Nav ref={desktopNavigation} aria-label="Main navigation">
                    {navigation.map(item => (
                        <NavLink key={item.to} to={item.to} $color={theme.colors[item.accent]}>{item.label}</NavLink>
                    ))}
                </Nav>
                <HeaderActions>
                    <ToggleButton type="button" onClick={toggleTheme} title="Toggle Theme" aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}>
                        {isDarkMode ? '🌞' : '🌛'}
                    </ToggleButton>
                    <HamburgerButton ref={menuButton} type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => {
                        setMenuOpen(previousValue => !previousValue);
                    }}>
                        <span className="menu-icon" aria-hidden="true"><span/><span/><span/></span>
                        <span>{menuOpen ? 'Close' : 'Menu'}</span>
                    </HamburgerButton>
                </HeaderActions>

                {/* Site navigation is a disclosure of ordinary links, with normal Tab navigation. */}
                <MobileMenuContainer ref={mobileNavigation} id="mobile-navigation" aria-label="Main navigation" hidden={!menuOpen}>
                    <MobileMenuList>
                        {navigation.map(item => (
                            <li key={item.to}>
                                <MobileNavLink to={item.to} $color={theme.colors[item.accent]} onClick={() => { setMenuOpen(false); }}>
                                    <span>{item.label}</span>
                                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 5 7 7-7 7"/></svg>
                                </MobileNavLink>
                            </li>
                        ))}
                    </MobileMenuList>
                </MobileMenuContainer>
            </HeaderContent>
        </HeaderContainer>
    );
};

export default Header;
