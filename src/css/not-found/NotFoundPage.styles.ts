import {Link} from 'react-router';
import styled from 'styled-components';

export const Page = styled.main`
    flex: 1;
    width: 100%;
    padding: 140px 20px 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const Content = styled.div`
    max-width: 700px;
`;

export const ErrorCode = styled.p`
    color: ${({theme}) => theme.colors.highlight1};
    font-family: ${({theme}) => theme.fonts.bold};
    font-size: clamp(6rem, 20vw, 12rem);
    line-height: 0.8;
`;

export const Title = styled.h1`
    margin-top: 2rem;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.demi};
    font-size: clamp(2rem, 7vw, 4rem);
    letter-spacing: 0.08em;
`;

export const Message = styled.p`
    max-width: 540px;
    margin: 1.5rem auto 2.5rem;
    color: ${({theme}) => theme.colors.text};
    font-size: 1.25rem;
    line-height: 1.5;
    opacity: 0.8;
`;

export const HomeLink = styled(Link)`
    display: inline-block;
    padding: 0.9rem 1.5rem;
    border: 2px solid ${({theme}) => theme.colors.highlight2};
    border-radius: 8px;
    color: ${({theme}) => theme.colors.highlight2};
    font-family: ${({theme}) => theme.fonts.demi};
    font-size: 1.1rem;
    letter-spacing: 0.08em;
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

    &:hover {
        background: ${({theme}) => theme.colors.highlight2};
        color: ${({theme}) => theme.colors.background1};
        transform: translateY(-2px);
    }

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight1};
        outline-offset: 4px;
    }
`;
