import styled from 'styled-components';

export const Panel = styled.section`
    max-width: 28rem;
    margin: 2rem auto;
    padding: clamp(1.5rem, 5vw, 2.5rem);
    border: 1px solid ${({theme}) => theme.colors.highlight3};
    border-radius: 16px;
    background: ${({theme}) => theme.colors.background2};
    line-height: 1.6;

    p { margin: 0.75rem 0; }
    form { display: grid; gap: 0.75rem; }
    input {
        min-width: 0;
        width: 100%;
        padding: 0.75rem;
        border: 1px solid ${({theme}) => theme.colors.text};
        border-radius: 8px;
        background: ${({theme}) => theme.colors.background1};
        color: ${({theme}) => theme.colors.text};
        font: inherit;
    }
    input:focus-visible { outline: 3px solid ${({theme}) => theme.colors.highlight3}; outline-offset: 3px; }
`;

export const Button = styled.button`
    min-height: 44px;
    padding: 0.65rem 1.25rem;
    border: 1px solid ${({theme}) => theme.colors.highlight3};
    border-radius: 8px;
    background: ${({theme}) => theme.colors.highlight3};
    color: #201933;
    font: inherit;
    &:disabled { opacity: 0.6; cursor: wait; }
    &:focus-visible { outline: 3px solid ${({theme}) => theme.colors.highlight3}; outline-offset: 3px; }
`;

export const AccessBar = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
`;
