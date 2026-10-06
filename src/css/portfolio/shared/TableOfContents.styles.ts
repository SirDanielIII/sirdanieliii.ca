import styled from 'styled-components';

export const SectionIndex = styled.nav`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    margin: 0 0 1.25rem;
    padding: 0.75rem 0;
    font-size: 0.9rem;
    color: var(--portfolio-muted);
    > p { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; }
    ol { list-style: none; margin: 0; padding: 0; }
    > ol { display: grid; grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); gap: 1rem 1.5rem; }
    li { min-width: 0; }
    > ol > li { border-left: 1px solid var(--portfolio-line); padding-left: 1rem; }
    a { display: flex; align-items: center; min-height: 44px; padding: 0.4rem 0; line-height: 1.4; text-decoration: none; text-underline-offset: 0.25em; }
    > ol > li > a { font-family: Georgia, 'Times New Roman', serif; font-size: 1.2rem; color: var(--portfolio-accent); }
    li ol a { font-size: 0.85rem; }
    a:hover { color: var(--portfolio-accent); text-decoration: underline; }
    a:focus-visible { outline: 2px solid var(--portfolio-accent); outline-offset: 3px; }
    @media (max-width: 850px) {
        > ol { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 480px) { > ol { grid-template-columns: 1fr; gap: 0.5rem; } }
    &[data-layout='sections'] {
        padding-bottom: 0;
        margin-bottom: var(--portfolio-divider-space);
        > ol { display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; }
        > ol > li { flex: 0 1 auto; max-width: 100%; }
        > ol > li > a { white-space: nowrap; }
        @media (max-width: 600px) { > ol { display: grid; grid-template-columns: 1fr; gap: 0.25rem; } }
        @media (max-width: 380px) { > ol > li > a { white-space: normal; } }
    }
    &[data-layout='films'] {
        padding: 0.25rem 0 var(--portfolio-divider-space);
        border-bottom: 1px solid var(--portfolio-line);
        gap: 0.75rem;
        margin-bottom: var(--portfolio-divider-space);
        > p { font-size: 0.75rem; }
        > ol { gap: 0.5rem 1rem; }
        > ol > li { padding-left: 0.75rem; }
        a { padding: 0.2rem 0; }
        > ol > li > a { font-size: 1.35rem; }
        li ol a { font-size: 1.05rem; min-height: 36px; }
        @media (pointer: coarse) { li ol a { min-height: 44px; } }
    }
`;
