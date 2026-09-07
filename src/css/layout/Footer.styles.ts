import {Link} from 'react-router';
import styled, {css} from 'styled-components';

export const FooterContainer = styled.footer`
    margin-top: auto;
    padding: clamp(2rem, 4vw, 3.25rem) clamp(1.25rem, 5vw, 3rem) 1.25rem;
    border-top: 3px solid ${({theme}) => theme.colors.highlight1};
    background: linear-gradient(
        135deg,
        ${({theme}) => theme.colors.footer} 0%,
        ${({theme}) => theme.colors.background2} 100%
    );
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

export const FooterContent = styled.div`
    width: 100%;
    max-width: 75rem;
    margin: 0 auto;
`;

export const FooterMain = styled.div`
    display: grid;
    grid-template-columns: minmax(20rem, 1fr) minmax(0, 2fr);
    align-items: start;
    gap: clamp(2.5rem, 6vw, 5rem);

    @media (max-width: 900px) {
        grid-template-columns: minmax(0, 1fr);
        gap: 1.75rem;
    }
`;

export const Brand = styled.div`
    min-width: 0;
`;

export const BrandTop = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1rem;
`;

export const BrandLink = styled(Link)`
    color: ${({theme}) => theme.colors.highlight4};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: clamp(1.65rem, 4vw, 2.2rem);
    line-height: 1;
    letter-spacing: 0.06em;
    white-space: nowrap;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight2};
        outline-offset: 5px;
        border-radius: 3px;
    }
`;

export const VersionBadge = styled.span`
    padding: 0.35rem 0.65rem;
    border: 1px solid ${({theme}) => theme.colors.highlight4};
    border-radius: 999px;
    color: ${({theme}) => theme.colors.highlight4};
    font-family: ${({theme}) => theme.fonts.demi};
    font-size: 0.8rem;
    line-height: 1;
    letter-spacing: 0.04em;
    white-space: nowrap;
`;

export const BrandDescription = styled.p`
    max-width: 28rem;
    margin-top: 0.9rem;
    color: ${({theme}) => theme.colors.text};
    font-size: 1rem;
    line-height: 1.5;
    opacity: 0.72;

    @media (max-width: 600px) {
        margin-top: 0.7rem;
        font-size: 0.9rem;
        line-height: 1.4;
    }
`;

export const FooterNav = styled.nav`
    min-width: 0;

    @media (max-width: 900px) {
        padding-top: 1.5rem;
        border-top: 1px solid rgba(127, 127, 127, 0.28);
    }
`;

export const SectionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(1.5rem, 3vw, 3rem);

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.5rem 1rem;
    }
`;

export const Section = styled.section`
    min-width: 0;
`;

export const SectionTitle = styled.h2`
    margin-bottom: 0.75rem;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.demi};
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 0.05em;
    text-transform: uppercase;

    @media (max-width: 600px) {
        margin-bottom: 0.5rem;
        font-size: 1rem;
    }
`;

export const SectionList = styled.ul`
    display: grid;
    gap: 0.55rem;
    list-style: none;

    @media (max-width: 600px) {
        gap: 0.35rem;
    }
`;

export const SectionItem = styled.li`
    min-width: 0;
    color: ${({theme}) => theme.colors.text};
    font-size: 0.98rem;
    line-height: 1.35;
    overflow-wrap: anywhere;

    @media (max-width: 600px) {
        font-size: 0.88rem;
    }
`;

const footerLinkStyles = css`
    color: ${({theme}) => theme.colors.highlight2};
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.22em;
    transition: color 0.2s ease, text-decoration-color 0.2s ease;

    &:hover {
        color: ${({theme}) => theme.colors.highlight1};
        text-decoration-color: currentColor;
    }

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight2};
        outline-offset: 3px;
        border-radius: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

export const FooterRouteLink = styled(Link)`
    ${footerLinkStyles}
`;

export const FooterExternalLink = styled.a`
    ${footerLinkStyles}
`;

export const ItemText = styled.span`
    opacity: 0.65;
`;

export const BottomBar = styled.div`
    margin-top: clamp(2rem, 4vw, 3rem);
    padding-top: 1.1rem;
    border-top: 1px solid rgba(127, 127, 127, 0.28);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem 2rem;
    color: ${({theme}) => theme.colors.text};
    font-size: 0.82rem;
    line-height: 1.4;
    opacity: 0.68;

    @media (max-width: 600px) {
        margin-top: 1.75rem;
        padding-top: 0.9rem;
        flex-direction: column;
        align-items: stretch;
        gap: 0.35rem;
        font-size: 0.78rem;
    }
`;

export const WorkInProgress = styled.p`
    width: 100%;
    min-width: 0;
    max-width: 46rem;
    overflow-wrap: anywhere;
`;

export const Copyright = styled.p`
    white-space: nowrap;

    @media (max-width: 600px) {
        white-space: normal;
    }
`;
