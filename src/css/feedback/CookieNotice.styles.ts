import styled from 'styled-components';

export const Notice = styled.aside`
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 2000;
    width: 24rem;
    max-width: calc(100% - 2rem);
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 2px solid ${({theme}) => theme.colors.highlight2};
    border-radius: 10px;
    background: ${({theme}) => theme.colors.background2};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
    color: ${({theme}) => theme.colors.text};
`;

export const Message = styled.p`
    flex: 1;
    font-size: 0.95rem;
    line-height: 1.35;
`;

export const DismissButton = styled.button`
    flex: 0 0 auto;
    padding: 0.45rem 0.75rem;
    border: 2px solid ${({theme}) => theme.colors.highlight2};
    border-radius: 7px;
    background: ${({theme}) => theme.colors.highlight2};
    color: #111;

    &:hover {
        opacity: 0.82;
    }

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight1};
        outline-offset: 2px;
    }
`;
