import React from 'react';
import pkg from '../../../package.json';
import {
    FooterContainer,
    FooterContent,
    FooterMain,
    Brand,
    BrandTop,
    BrandLink,
    VersionBadge,
    BrandDescription,
    FooterNav,
    SectionsGrid,
    Section,
    SectionTitle,
    SectionList,
    SectionItem,
    FooterRouteLink,
    FooterExternalLink,
    ItemText,
    BottomBar,
    WorkInProgress,
    Copyright,
} from '../../css/layout/Footer.styles';

interface FooterItem {
    label: string;
    href?: string;
    openInNewTab?: boolean;
}

interface FooterSection {
    title: string;
    items: FooterItem[];
}

// Add, remove, or reorder footer content here. The layout adapts automatically.
const footerSections: FooterSection[] = [
    {
        title: 'Projects',
        items: [
            {label: 'I Have A Question', href: 'https://sirdanieliii.ca/projects/ihaveaquestion/'},
            {label: 'CISC 322 (2024F)', href: 'https://sirdanieliii.ca/cisc322/'},
        ],
    },
    {
        title: 'Portfolio',
        items: [
            {label: 'Explore portfolio', href: '/portfolio/'},
        ],
    },
    {
        title: 'Merch',
        items: [
            {label: 'Visit merch', href: '/merch/'},
        ],
    },
    {
        title: 'Guides',
        items: [
            {label: 'Browse guides', href: '/guides/'},
        ],
    },
];

const FooterItemContent: React.FC<{ item: FooterItem }> = ({item}) => {
    if (!item.href) {
        return <ItemText>{item.label}</ItemText>;
    }

    if (item.href.startsWith('/')) {
        return <FooterRouteLink to={item.href}>{item.label}</FooterRouteLink>;
    }

    return (
        <FooterExternalLink
            href={item.href}
            target={item.openInNewTab ? '_blank' : undefined}
            rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
        >
            {item.label}
        </FooterExternalLink>
    );
};

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <FooterContainer>
            <FooterContent>
                <FooterMain>
                    <Brand>
                        <BrandTop>
                            <BrandLink to="/">sirdanieliii.ca</BrandLink>
                            <VersionBadge aria-label={`Website version ${pkg.version}`}>
                                v{pkg.version}
                            </VersionBadge>
                        </BrandTop>
                        <BrandDescription>
                            A collection of stuff made by me.
                        </BrandDescription>
                    </Brand>

                    <FooterNav aria-label="Footer navigation">
                        <SectionsGrid>
                            {footerSections.map(section => (
                                <Section key={section.title}>
                                    <SectionTitle>{section.title}</SectionTitle>
                                    <SectionList>
                                        {section.items.map(item => (
                                            <SectionItem key={`${section.title}-${item.label}`}>
                                                <FooterItemContent item={item}/>
                                            </SectionItem>
                                        ))}
                                    </SectionList>
                                </Section>
                            ))}
                        </SectionsGrid>
                    </FooterNav>
                </FooterMain>

                <BottomBar>
                    <WorkInProgress>
                        This website is still a work in progress as I continue building it in my free time. 😁
                    </WorkInProgress>
                    <Copyright>© {currentYear} Sir Daniel III</Copyright>
                </BottomBar>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;
