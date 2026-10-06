import type {ReactNode} from 'react';
import type {PortfolioMedium} from '../../../css/theme';
import {Page} from '../../../css/portfolio/layout/PortfolioLayout.styles';
import ContactSection from './ContactSection';
import PortfolioNavigation from './PortfolioNavigation';

export default function PortfolioLayout({medium, children}: {medium: PortfolioMedium; children: ReactNode}) {
    return <Page $medium={medium}>
        <PortfolioNavigation />
        {children}
        <ContactSection />
    </Page>;
}
