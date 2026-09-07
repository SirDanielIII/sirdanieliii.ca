import styled from 'styled-components';

export const Title = styled.h2`
    font-size: 48px;
    font-weight: 400;
    color: ${({theme}) => theme.colors.highlight2};
    margin-bottom: 10px;

    @media (max-width: 600px) {
        font-size: 36px;
    }
`;

export const Desc = styled.p`
    font-size: 22px;
    line-height: 1.6;
    margin-bottom: 20px;
    max-width: 800px;
    color: ${({theme}) => theme.colors.text};

    @media (max-width: 600px) {
        font-size: 18px;
    }
`;
