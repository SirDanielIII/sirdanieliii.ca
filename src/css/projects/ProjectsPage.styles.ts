import styled, {keyframes} from 'styled-components';

export const PageContainer = styled.main`
    flex: 1;
    width: 100%;
    max-width: 100rem;
    margin: 0 auto;
    padding: 7.5rem clamp(2rem, 5vw, 5rem) 6rem;

    @media (max-width: 720px) {
        padding: 6.5rem clamp(1rem, 5vw, 2rem) 4rem;
    }
`;

export const FormControl = styled.label`
    position: relative;
    width: min(100%, 50rem);
    margin: 0 auto 2.75rem;
    display: block;
`;

export const VisuallyHidden = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 0.85em 1em;
    border: none;
    border-bottom: 2px solid ${({theme}) => theme.colors.text};
    background: transparent;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 1.2rem;

    &::placeholder {
        color: ${({theme}) => theme.colors.text};
        opacity: 0.55;
    }

    &:focus {
        outline: none;
    }

    &:focus-visible {
        box-shadow: 0 5px 12px rgba(0, 0, 0, 0.16);
    }
`;

export const InputBorder = styled.span`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(
        90deg,
        ${({theme}) => theme.colors.highlight1} 0%,
        ${({theme}) => theme.colors.highlight2} 65%,
        ${({theme}) => theme.colors.highlight3} 100%
    );
    transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1);

    ${SearchInput}:focus + & {
        width: 100%;
    }
`;

export const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: clamp(1.25rem, 1.5vw, 2rem);

    & > * {
        flex: 0 1 clamp(17rem, 18vw, 21rem);
    }
`;

export const MessagePanel = styled.div`
    width: min(100%, 42rem);
    margin: 2rem auto 0;
    padding: 2rem;
    border: 2px solid ${({theme}) => theme.colors.highlight3};
    background: ${({theme}) => theme.colors.background2};
    color: ${({theme}) => theme.colors.text};
    text-align: center;
`;

export const MessageTitle = styled.h2`
    color: ${({theme}) => theme.colors.highlight3};
    font-size: 1.8rem;
    font-weight: 400;
`;

export const MessageCopy = styled.p`
    margin-top: 0.6rem;
    font-size: 1.05rem;
    line-height: 1.45;
    opacity: 0.8;
`;

export const RetryButton = styled.button`
    margin-top: 1.25rem;
    padding: 0.65rem 1.2rem;
    border: 2px solid ${({theme}) => theme.colors.highlight2};
    border-radius: 8px;
    color: ${({theme}) => theme.colors.highlight2};

    &:hover {
        background: ${({theme}) => theme.colors.highlight2};
        color: ${({theme}) => theme.colors.background1};
    }

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight1};
        outline-offset: 3px;
    }
`;

const bounce = keyframes`
    0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.4;
    }
    30% {
        transform: translateY(-0.45rem);
        opacity: 1;
    }
`;

export const LoadingState = styled.section`
    width: 100%;
`;

export const LoadingMessage = styled.div`
    margin-bottom: 2rem;
    color: ${({theme}) => theme.colors.text};
    text-align: center;
`;

export const LoadingTitle = styled.h2`
    color: ${({theme}) => theme.colors.highlight2};
    font-size: clamp(1.7rem, 5vw, 2.4rem);
    font-weight: 400;
    letter-spacing: 0.04em;
`;

export const LoadingCopy = styled.p`
    margin-top: 0.45rem;
    font-size: 1.05rem;
    opacity: 0.7;
`;

export const LoadingDots = styled.span`
    display: inline-flex;
    gap: 0.35rem;
    margin-left: 0.35rem;

    span {
        width: 0.38rem;
        height: 0.38rem;
        border-radius: 50%;
        background: currentColor;
        animation: ${bounce} 1.15s infinite ease-in-out;
    }

    span:nth-child(2) {
        animation-delay: 0.14s;
    }

    span:nth-child(3) {
        animation-delay: 0.28s;
    }

    @media (prefers-reduced-motion: reduce) {
        span {
            animation: none;
            opacity: 0.75;
        }
    }
`;

export const SkeletonGrid = styled(Grid)``;
