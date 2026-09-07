import {useState} from 'react';
import {type HomeSection} from './homeSections';
import {Background, Frame, Content, Title, Description, Arrow, CardLink} from '../../css/home/SectionCard.styles';

interface SectionCardProps {
    section: HomeSection;
    eager?: boolean;
}

const SectionCard = ({section, eager = false}: SectionCardProps) => {
    const [failedImage, setFailedImage] = useState<string | null>(null);
    const titleId = `home-section-${section.id}`;

    return (
        <CardLink to={section.to} $accent={section.accent} aria-labelledby={titleId} aria-describedby={`${titleId}-description`}>
            {failedImage !== section.image && (
                <Background
                    src={section.image}
                    alt=""
                    $position={section.imagePosition}
                    loading="eager"
                    fetchPriority={eager ? 'high' : 'auto'}
                    decoding="async"
                    onError={() => { setFailedImage(section.image); }}
                />
            )}
            <Frame $accent={section.accent} aria-hidden="true"/>
            <Arrow $accent={section.accent} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 18 18 6M6 6h12v12"/>
                </svg>
            </Arrow>
            <Content>
                <Title $accent={section.accent} id={titleId}>{section.title}</Title>
                <Description id={`${titleId}-description`}>{section.description}</Description>
            </Content>
        </CardLink>
    );
};

export default SectionCard;
