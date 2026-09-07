import {useState} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components';
import {homeSectionAspectRatio, type HomeSection} from '../../data/homeSections';

const Background = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform 0.55s ease;
`;

const Frame = styled.span`
    position: absolute;
    z-index: 2;
    inset: clamp(0.65rem, 2.8cqw, 1.1rem);
    border: 1px solid var(--section-accent);
    border-radius: 12px;
    opacity: 0.4;
    transform: scale(0.98);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    display: none;
`;

const Content = styled.div`
    position: absolute;
    z-index: 3;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.55rem;
    padding: clamp(1.35rem, 5.5cqw, 2.5rem);
    text-align: left;
`;

const Title = styled.h2`
    color: #ffffff;
    font-size: clamp(1.5rem, 7cqw, 3rem);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: 0.07em;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);

    &::before {
        content: '';
        display: block;
        width: 2.25rem;
        height: 3px;
        margin-bottom: 0.8rem;
        background: var(--section-accent);
    }
`;

const Description = styled.p`
    max-width: 32rem;
    color: #eeeef3;
    font-size: clamp(0.9rem, 2.9cqw, 1.1rem);
    line-height: 1.45;
    text-wrap: pretty;
`;

const Arrow = styled.span`
    position: absolute;
    z-index: 3;
    top: clamp(1.25rem, 5cqw, 2rem);
    right: clamp(1.25rem, 5cqw, 2rem);
    display: grid;
    place-items: center;
    width: clamp(2.1rem, 7cqw, 2.75rem);
    aspect-ratio: 1;
    border: 1px solid var(--section-accent);
    border-radius: 50%;
    background: rgba(12, 14, 20, 0.65);
    color: var(--section-accent);
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

    svg {
        width: 50%;
        height: 50%;
    }
`;

const CardLink = styled(Link)<{$accent: HomeSection['accent']}>`
    --section-accent: ${({theme, $accent}) => theme.colors[$accent]};
    position: relative;
    isolation: isolate;
    container-type: inline-size;
    display: block;
    width: 100%;
    min-width: 0;
    aspect-ratio: ${homeSectionAspectRatio};
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.mode === 'dark' ? '#393941' : '#d5d5df'};
    border-radius: 20px;
    background: linear-gradient(135deg, #313748, #161922);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    scroll-margin-top: 100px;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

    &::before {
        content: '';
        position: absolute;
        z-index: 1;
        inset: 0;
        background: linear-gradient(180deg, rgba(10, 12, 18, 0.06) 0%, rgba(10, 12, 18, 0.12) 30%, rgba(10, 12, 18, 0.7) 65%, rgba(10, 12, 18, 0.94) 100%);
        pointer-events: none;
    }

    &:focus-visible {
        outline: 3px solid var(--section-accent);
        outline-offset: 5px;
        border-color: var(--section-accent);
    }

    &:focus-visible ${Frame} {
        opacity: 1;
        transform: scale(1);
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-4px);
            border-color: var(--section-accent);
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2);
        }

        &:hover ${Background} {
            transform: scale(1.045);
        }

        &:hover ${Frame} {
            opacity: 1;
            transform: scale(1);
        }

        &:hover ${Arrow} {
            transform: translate(2px, -2px);
            background: var(--section-accent);
            color: #14141c;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        &, ${Background}, ${Frame}, ${Arrow} {
            transition: none;
        }

        &:hover, &:hover ${Background}, &:hover ${Arrow} {
            transform: none;
        }
    }
`;

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
                    style={{objectPosition: section.imagePosition ?? '50% 50%'}}
                    loading={eager ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={() => { setFailedImage(section.image); }}
                />
            )}
            <Frame aria-hidden="true"/>
            <Arrow aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 18 18 6M6 6h12v12"/>
                </svg>
            </Arrow>
            <Content>
                <Title id={titleId}>{section.title}</Title>
                <Description id={`${titleId}-description`}>{section.description}</Description>
            </Content>
        </CardLink>
    );
};

export default SectionCard;
