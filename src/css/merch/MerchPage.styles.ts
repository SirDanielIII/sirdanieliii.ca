import styled from 'styled-components';

export const Page = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 8.25rem 1.5rem 4.5rem;

    @media (max-width: 600px) {
        padding: 7rem 1.25rem 3rem;
    }
`;

export const Intro = styled.div`
    margin: 0 auto 3.5rem;
    text-align: center;

    @media (max-width: 600px) {
        margin-bottom: 2.5rem;
    }
`;

export const Title = styled.h1`
    color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight4 : '#16784f'};
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: 0.08em;
`;

export const Tagline = styled.p`
    margin-top: 1rem;
    font-size: clamp(1.3rem, 3vw, 1.75rem);
    line-height: 1.35;
`;

export const Introduction = styled.p`
    margin-top: 0.65rem;
    font-size: 1.05rem;
    line-height: 1.5;
    opacity: 0.7;
`;

export const CollectionHeading = styled.div`
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    border-bottom: 1px solid ${({theme}) => theme.mode === 'dark' ? '#353535' : '#dedede'};

    h2 {
        font-size: 1.05rem;
        font-weight: 400;
        letter-spacing: 0.1em;
    }

    p {
        font-size: 0.9rem;
        line-height: 1.4;
        opacity: 0.65;
    }
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.75rem;

    @media (max-width: 960px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 600px) {
        grid-template-columns: minmax(0, 1fr);
        gap: 1.5rem;
    }
`;

export const EmptyState = styled.div`
    padding: 3rem 1.25rem;
    text-align: center;

    h3 {
        font-size: 1.6rem;
        font-weight: 400;
    }

    p {
        margin-top: 0.75rem;
        line-height: 1.5;
        opacity: 0.75;
    }
`;
