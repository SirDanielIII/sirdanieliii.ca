import PortfolioViewer from './PortfolioViewer';

import {useState} from 'react';

import {portfolio, portfolioDocuments} from './portfolio';

import {Page, Intro, CollectionPicker, CollectionButton} from '../../css/portfolio/PortfolioPage.styles';

const PortfolioPage = () => {
    const [selectedDocument, setSelectedDocument] = useState(portfolioDocuments[0]);

    return (
        <Page>
            <Intro>
                <h1>{portfolio.title}</h1>
                <p>{portfolio.introduction}</p>
            </Intro>
            <CollectionPicker role="group" aria-label="Choose a portfolio">
                {portfolioDocuments.map(document => (
                    <CollectionButton
                        key={document.id}
                        type="button"
                        aria-pressed={document.id === selectedDocument.id}
                        aria-controls="portfolio-document"
                        onClick={() => { setSelectedDocument(document); }}
                    >
                        {document.title}
                    </CollectionButton>
                ))}
            </CollectionPicker>
            <PortfolioViewer key={selectedDocument.file} document={selectedDocument}/>
        </Page>
    );
};

export default PortfolioPage;
