import React from 'react';
import {Page, Content, ErrorCode, Title, Message, HomeLink} from '../../css/not-found/NotFoundPage.styles';

const NotFoundPage: React.FC = () => (
    <Page aria-labelledby="not-found-title">
        <Content>
            <ErrorCode aria-hidden="true">404</ErrorCode>
            <Title id="not-found-title">HEY, YOU'RE NOT SUPPOSED TO BE HERE.</Title>
            <Message>
                That page doesn't exist. It may have moved, or this URL was never invited in the first place.
            </Message>
            <HomeLink to="/">TAKE ME HOME</HomeLink>
        </Content>
    </Page>
);

export default NotFoundPage;
