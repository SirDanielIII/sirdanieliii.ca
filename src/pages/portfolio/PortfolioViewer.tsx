import {useEffect, useState} from 'react';

import {type PortfolioDocument} from './portfolio';

import {
    DocumentPanel,
    DocumentHeader,
    DocumentActions,
    Pdf,
    Message,
} from '../../css/portfolio/PortfolioViewer.styles';

const PortfolioViewer = ({document}: {document: PortfolioDocument}) => {
    const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');

    useEffect(() => {
        const controller = new AbortController();

        // A missing file can return the SPA's HTML with status 200, so check its type too.
        // HEAD checks availability without downloading the whole PDF twice.
        const checkDocument = async () => {
            try {
                const response = await fetch(document.file, {method: 'HEAD', cache: 'no-store', signal: controller.signal});
                const isPdf = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase() === 'application/pdf';
                if (!controller.signal.aborted) setStatus(response.ok && isPdf ? 'ready' : 'unavailable');
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
                        <a href={document.file} download>Download PDF</a>
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
                    {status === 'loading' ? (
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

export default PortfolioViewer;
