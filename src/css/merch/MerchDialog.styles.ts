import styled from 'styled-components';

export const PurchaseDialog = styled.dialog`
    position: fixed;
    inset: 0;
    width: min(30rem, calc(100% - 2.5rem));
    max-height: calc(100dvh - 3rem);
    margin: auto;
    padding: clamp(1.5rem, 5vw, 2.25rem);
    overflow-y: auto;
    border: 2px solid ${({theme}) => theme.colors.highlight4};
    border-radius: 18px;
    background: ${({theme}) => theme.colors.background2};
    color: ${({theme}) => theme.colors.text};
    text-align: center;
    overflow-wrap: anywhere;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);

    &::backdrop {
        background: rgba(0, 0, 0, 0.72);
        backdrop-filter: blur(4px);
    }

    h2 {
        margin-top: 0.8rem;
        color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight4 : '#16784f'};
        font-size: 2rem;
        font-weight: 400;
        line-height: 1.15;
    }
`;

export const DialogProduct = styled.p`
    font-size: 0.85rem;
    line-height: 1.4;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    opacity: 0.65;
`;

export const Punchline = styled.p`
    margin-top: 1.25rem;
    font-size: 1.15rem;
    line-height: 1.5;
`;

export const DialogNote = styled.p`
    margin-top: 1.25rem;
    font-size: 0.85rem;
    line-height: 1.5;
    opacity: 0.65;
`;

export const CloseButton = styled.button`
    width: 100%;
    min-height: 46px;
    margin-top: 1.5rem;
    padding: 0.8rem 1rem;
    border: 0;
    border-radius: 8px;
    background: ${({theme}) => theme.colors.highlight4};
    color: #11261d;

    &:hover {
        filter: brightness(1.08);
    }

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight4};
        outline-offset: 4px;
    }
`;
