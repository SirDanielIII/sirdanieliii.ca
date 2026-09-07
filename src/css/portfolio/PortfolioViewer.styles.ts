import styled from 'styled-components';

export const DocumentPanel = styled.section`
    min-width: 0;
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.mode === 'dark' ? '#3b3548' : '#ded9e9'};
    border-radius: 16px;
    background: ${({theme}) => theme.colors.background2};
`;

export const DocumentHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
    padding: clamp(1.25rem, 3vw, 2rem);

    h2 {
        font-size: 1.65rem;
        font-weight: 400;
    }

    p {
        margin-top: 0.5rem;
        line-height: 1.5;
        opacity: 0.75;
    }
`;

export const DocumentActions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;

    a {
        display: inline-flex;
        align-items: center;
        min-height: 44px;
        padding: 0.65rem 1rem;
        border: 1px solid ${({theme}) => theme.colors.highlight3};
        border-radius: 8px;
    }

    a:hover {
        text-decoration: underline;
        text-underline-offset: 0.2em;
    }

    a:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight3};
        outline-offset: 3px;
    }
`;

export const Pdf = styled.object`
    display: block;
    width: 100%;
    height: clamp(28rem, 75dvh, 64rem);
    border: 0;
`;

export const Message = styled.div`
    display: grid;
    align-content: center;
    gap: 0.75rem;
    min-height: 18rem;
    padding: 2rem;
    text-align: center;
    line-height: 1.6;

    a {
        text-decoration: underline;
        text-underline-offset: 0.2em;
    }
`;
