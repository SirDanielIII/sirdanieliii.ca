import {useEffect, useState} from 'react';
import styled from 'styled-components';
import PortfolioAccess from './PortfolioAccess';
import {portfolio, portfolioDocuments, type PortfolioDocument} from '../data/portfolio';

const Page = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 8.25rem 1.5rem 4.5rem;

    @media (max-width: 600px) {
        padding: 7rem 1rem 3rem;
    }
`;

const Intro = styled.div`
    max-width: 42rem;
    margin: 0 auto 2rem;
    text-align: center;

    h1 {
        color: ${({theme}) => theme.mode === 'dark' ? theme.colors.highlight3 : '#6752a3'};
        font-size: clamp(2rem, 5vw, 3rem);
        font-weight: 400;
        letter-spacing: 0.08em;
    }

    p {
        margin-top: 1rem;
        font-size: 1.1rem;
        line-height: 1.6;
        opacity: 0.8;
    }
`;

const CollectionPicker = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
`;

const CollectionButton = styled.button`
    min-height: 46px;
    padding: 0.75rem 1.5rem;
    border: 1px solid ${({theme}) => theme.colors.highlight3};
    border-radius: 9px;
    background: ${({theme}) => theme.colors.background2};
    color: ${({theme}) => theme.colors.text};

    &[aria-pressed='true'] {
        background: ${({theme}) => theme.colors.highlight3};
        color: #201933;
    }

    &:hover {
        box-shadow: 0 0 0 1px ${({theme}) => theme.colors.highlight3};
    }

    &:focus-visible {
        outline: 3px solid ${({theme}) => theme.colors.highlight3};
        outline-offset: 4px;
    }
`;

const DocumentPanel = styled.section`
    min-width: 0;
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.mode === 'dark' ? '#3b3548' : '#ded9e9'};
    border-radius: 16px;
    background: ${({theme}) => theme.colors.background2};
`;

const DocumentHeader = styled.div`
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

const DocumentActions = styled.div`
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

const Pdf = styled.object`
    display: block;
    width: 100%;
    height: clamp(28rem, 75dvh, 64rem);
    border: 0;
`;

const Message = styled.div`
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

const PortfolioViewer = ({document}: {document: PortfolioDocument}) => {
    const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable' | 'expired'>('loading');

    useEffect(() => {
        const controller = new AbortController();

        // A missing file can return the SPA's HTML with status 200, so check its type too.
        // HEAD checks availability without downloading the whole PDF twice.
        const checkDocument = async () => {
            try {
                const response = await fetch(document.file, {method: 'HEAD', cache: 'no-store', signal: controller.signal});
                const isPdf = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase() === 'application/pdf';
                if (!controller.signal.aborted) setStatus(response.status === 401 ? 'expired' : response.ok && isPdf ? 'ready' : 'unavailable');
            } catch {
                if (!controller.signal.aborted) setStatus('unavailable');
            }
        };

        void checkDocument();
        return () => { controller.abort(); };
    }, [document.file]);

    return (
        <DocumentPanel id="portfolio-document" aria-labelledby="portfolio-document-title">
            <DocumentHeader>
                <div>
                    <h2 id="portfolio-document-title">{document.title}</h2>
                    <p>{document.description}</p>
                </div>
                {status === 'ready' && (
                    <DocumentActions>
                        <a href={document.file} target="_blank" rel="noopener noreferrer">Open PDF in new tab</a>
                        <a href={`${document.file}&download=1`} download>Download PDF</a>
                    </DocumentActions>
                )}
            </DocumentHeader>
            {status === 'ready' ? (
                <Pdf data={`${document.file}#view=FitH`} type="application/pdf" aria-label={`${document.title} portfolio PDF`}>
                    <Message>
                        <p>You can open this portfolio in a new tab or download it to browse the pages.</p>
                        <a href={document.file} target="_blank" rel="noopener noreferrer">Open {document.title.toLowerCase()} PDF</a>
                    </Message>
                </Pdf>
            ) : (
                <Message role="status">
                    {status === 'expired' ? <p>Your session has expired. Refresh the page to unlock the portfolio again.</p> : status === 'loading' ? (
                        <p>Loading the {document.title.toLowerCase()} portfolio…</p>
                    ) : (
                        <>
                            <p>This portfolio isn’t available yet.</p>
                            <p>Please check back soon, or take a look at the other collection.</p>
                        </>
                    )}
                </Message>
            )}
        </DocumentPanel>
    );
};

const PortfolioPage = () => {
    const [selectedDocument, setSelectedDocument] = useState(portfolioDocuments[0]);

    return (
        <Page>
            <Intro>
                <h1>{portfolio.title}</h1>
                <p>{portfolio.introduction}</p>
            </Intro>
            <PortfolioAccess>
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
            </PortfolioAccess>
        </Page>
    );
};

export default PortfolioPage;
