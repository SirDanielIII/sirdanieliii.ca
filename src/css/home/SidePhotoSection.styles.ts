import styled from 'styled-components';

/* ---------- layout primitives ---------- */
export const Section = styled.section<{ $bg?: string; $pad: string }>`
    width: 100%;
    background: ${({$bg, theme}) => $bg ?? theme.colors.background1};
    padding: ${({$pad}) => $pad};

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;

    @media (max-width: 1100px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const PhotoCol = styled.div<{ $max: string; $aspectRatio: string }>`
    flex: 0 0 ${({$max}) => $max};
    width: 100%;
    max-width: ${({$max}) => $max};
    aspect-ratio: ${({$aspectRatio}) => $aspectRatio};

    @media (max-width: 1100px) {
        flex: 0 1 auto;
    }
`;

export const TextCol = styled.div`
    flex: 0 1 700px;
    max-width: 700px;

    display: flex;
    flex-direction: column;
    text-align: left;
    padding-left: 40px;

    @media (max-width: 1100px) {
        flex: 0 1 100%;
        padding: 20px 0 0;
        text-align: center;
        align-items: center;
        max-width: none;
    }
`;
