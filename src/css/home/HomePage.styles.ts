import styled from 'styled-components';

export const MainContent = styled.main`
    margin-top: 80px; /* Space for fixed header */
`;

export const AboutMeSection = styled.section`
    width: 100%;
    background: ${({theme}) => theme.colors.background1};
    padding: 60px 20px;
    text-align: center;
`;

export const AboutMeTitle = styled.h1`
    font-size: 64px;
    font-weight: 400;
    color: ${({theme}) => theme.colors.highlight1};
    margin-bottom: 20px;

    @media (max-width: 600px) {
        font-size: 48px;
    }
`;

export const AboutMeDesc = styled.p`
    max-width: 800px;
    margin: 0 auto 40px;
    font-size: 24px;
    line-height: 1.5;

    @media (max-width: 600px) {
        font-size: 18px;
    }
`;

export const IconsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

export const IconLink = styled.a`
    display: inline-flex;
    width: 70px;
    height: 70px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    transition: transform 0.2s ease;

    img {
        width: 60%;
        height: 60%;
        object-fit: contain;
        transition: filter .18s ease;
        filter: ${({theme}) => theme.mode === 'dark' ? 'brightness(0) invert(1)' : 'brightness(0)'};
    }

    &:hover {
        transform: translateY(-3px);
    }
`;

export const Sections = styled.section`
    width: 100%;
    background: ${({theme}) => theme.colors.background2};
    padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
`;

export const SectionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(1.25rem, 2.5vw, 2rem);
    max-width: 1240px;
    margin: 0 auto;

    @media (max-width: 700px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;
