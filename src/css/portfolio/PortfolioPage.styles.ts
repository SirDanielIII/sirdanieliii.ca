import styled from 'styled-components';

export const Page = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 8.25rem 1.5rem 4.5rem;

    @media (max-width: 600px) {
        padding: 7rem 1rem 3rem;
    }
`;

export const Intro = styled.div`
    max-width: 42rem;
    margin: 0 auto 2rem;
    text-align: center;

    h1 {
        color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight3 : '#6752a3'};
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: 400;
        letter-spacing: 0.08em;
    }

    p {
        margin-top: 1rem;
        font-size: 1.1rem;
        line-height: 1.6;
        opacity: 0.8;
    }
`;

export const CollectionPicker = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
`;

export const CollectionButton = styled.button`
    min-height: 46px;
    padding: 0.75rem 1.5rem;
    border: 1px solid ${({theme}) => theme.colors.highlight3};
    border-radius: 9px;
    background: ${({theme}) => theme.colors.background2};
    color: ${({theme}) => theme.colors.text};

    &[aria-pressed='true'] {
        background: ${({theme}) => theme.colors.highlight3};
        color: #201933;
    }

    &:hover {
        box-shadow: 0 0 0 1px ${({theme}) => theme.colors.highlight3};
    }

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight3};
        outline-offset: 4px;
    }
`;
