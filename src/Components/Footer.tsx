import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background: ${({theme}) => theme.colors.footerBg};
    padding: 40px 20px;
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 40px;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ProfileImage = styled.img`
    width: 253px;
    height: 253px;
    border-radius: 41px;
    object-fit: cover;

    @media (max-width: 600px) {
        width: 150px;
        height: 150px;
    }
`;

const Columns = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-around;

    @media (max-width: 600px) {
        flex-direction: column;
        gap: 20px;
        align-items: center;
    }
`;

const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 600px) {
        align-items: center;
    }
`;

const ColTitle = styled.h3`
    color: #9BA9D4;
    font-size: 36px;
    margin-bottom: 20px;

    @media (max-width: 600px) {
        font-size: 28px;
    }
`;

const ColItem = styled.p`
    color: #9BA9D4;
    font-size: 20px;
    margin: 10px 0;

    @media (max-width: 600px) {
        font-size: 16px;
    }
`;

interface FooterProps {
    profileImage: string;
}

const Footer: React.FC<FooterProps> = ({ profileImage }) => {
    return (
        <FooterContainer>
            <FooterContent>
                <ProfileImage src={profileImage} alt="Footer Profile" />
                <Columns>
                    <Col>
                        <ColTitle>PROJECTS</ColTitle>
                        <ColItem>link</ColItem>
                        <ColItem>link</ColItem>
                        <ColItem>link</ColItem>
                        <ColItem>link</ColItem>
                    </Col>
                    <Col>
                        <ColTitle>PORTFOLIO</ColTitle>
                        <ColItem>Photo</ColItem>
                        <ColItem>Video</ColItem>
                        <ColItem>link</ColItem>
                        <ColItem>link</ColItem>
                    </Col>
                    <Col>
                        <ColTitle>MERCH</ColTitle>
                        <ColItem>Store</ColItem>
                    </Col>
                    <Col>
                        <ColTitle>ARTICLES</ColTitle>
                        <ColItem>Recipes</ColItem>
                        <ColItem>link</ColItem>
                        <ColItem>link</ColItem>
                        <ColItem>link</ColItem>
                    </Col>
                </Columns>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;
