import styled from 'styled-components';

export const H1 = styled.h1`
    font-size: 4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.highlight1};
    margin-bottom: 1rem;

    @media (max-width: 600px) {
        font-size: 3rem;
    }
`;

export const P = styled.p<{ size?: string; color?: string }>`
    font-size: ${({ size = '1.25rem' }) => size};
    line-height: 1.5;
    color: ${({ color, theme }) => color ?? theme.colors.text};
    max-width: 800px;
    margin: 0 auto 2rem;

    @media (max-width: 600px) {
        font-size: calc(${({ size = '1.25rem' }) => size} - 0.25rem);
    }
`;
