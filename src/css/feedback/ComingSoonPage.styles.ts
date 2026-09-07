import styled from 'styled-components';
import type {AppTheme} from '../theme';

export const Page = styled.main`
    flex: 1;
    width: 100%;
    max-width: 50rem;
    margin-inline: auto;
    padding-inline: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const Title = styled.h1<{ $accent: keyof AppTheme['colors'] }>`
    margin-bottom: 1rem;
    color: ${({theme, $accent}) => theme.colors[$accent]};
    font-family: ${({theme}) => theme.fonts.demi};
    font-size: 3rem;
`;

export const Message = styled.p`
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 1.25rem;
`;
