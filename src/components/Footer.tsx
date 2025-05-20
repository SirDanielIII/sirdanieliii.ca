import React from 'react';
import styled from 'styled-components';
import pkg from '../../package.json';

const FooterContainer = styled.footer`
    background: linear-gradient(
            135deg,
            ${({theme}) => theme.colors.footer} 0%,
            ${({theme}) => theme.colors.background2} 100%
    );
    padding: 30px 30px;
    border-top: 3px solid ${({theme}) => theme.colors.highlight1};
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const FooterContainerExtra = styled.footer`
    border-top: 3px solid ${({theme}) => theme.colors.highlight1};
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 40px;
    align-items: center;
    padding-bottom: 30px;

    @media (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
    }
`;

const VersionText = styled.div`
    font-size: 64px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.highlight4 || '#fff'};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    text-align: center;

    @media (max-width: 1000px) {
        font-size: 48px;
    }
`;

const Columns = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-around;

    @media (max-width: 1000px) {
        flex-direction: column;
        gap: 20px;
        align-items: center;
    }
`;

const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 1000px) {
        align-items: center;
    }
`;

const ColTitle = styled.h3`
    color: ${({theme}) => theme.colors.text};
    font-size: 24px;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const ColItem = styled.p`
    color: ${({theme}) => theme.colors.text};
    font-size: 18px;
    margin: 8px 0;

    a {
        color: ${({theme}) => theme.colors.highlight2};
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
            color: ${({theme}) => theme.colors.highlight1};
        }
    }
`;


const NoticeText = styled.p`
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.text};
    opacity: 0.7;
    text-align: center;
    padding-top: 30px;
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <VersionText>v{pkg.version}</VersionText>
                <Columns>
                    <Col>
                        <ColTitle>Projects</ColTitle>
                        <ColItem>
                            <a href="https://sirdanieliii.ca/projects/ihaveaquestion/">
                                I Have A Question
                            </a>
                        </ColItem>
                        <ColItem>
                            <a href="https://sirdanieliii.ca/cisc322/">
                                CISC 322 (2024F)
                            </a>
                        </ColItem>
                    </Col>
                    <Col>
                        <ColTitle>Portfolio</ColTitle>
                        <ColItem>[WIP]</ColItem>
                    </Col>
                    <Col>
                        <ColTitle>Merch</ColTitle>
                        <ColItem>[WIP]</ColItem>
                    </Col>
                    <Col>
                        <ColTitle>Guides</ColTitle>
                        <ColItem>[WIP]</ColItem>
                    </Col>
                </Columns>
            </FooterContent>
            <FooterContainerExtra>
                <NoticeText>
                    This website still currently in the works as I continue to develop it in my free time 😁
                </NoticeText>
            </FooterContainerExtra>
        </FooterContainer>
    );
};

export default Footer;
