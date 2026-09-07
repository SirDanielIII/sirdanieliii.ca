import {Link} from 'react-router';
import styled from 'styled-components';
import {homeSectionAspectRatio, type HomeSection} from '../../pages/home/homeSections';
import type {AppTheme} from '../theme';

interface AccentProps {$accent: HomeSection['accent']}

const accentColour = ({theme, $accent}: AccentProps & {theme: AppTheme}) => theme.colors[$accent];

export const Background = styled.img<{$position?: string}>`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: ${({$position}) => $position ?? '50% 50%'};
    transition: transform 0.55s ease;
`;

export const Frame = styled.span<AccentProps>`
    position: absolute;
    z-index: 2;
    inset: clamp(0.65rem, 2.8cqw, 1.1rem);
    border: 1px solid ${accentColour};
    border-radius: 12px;
    opacity: 0.4;
    transform: scale(0.98);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
    display: none;
`;

export const Content = styled.div`
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

export const Title = styled.h2<AccentProps>`
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
        background: ${accentColour};
    }
`;

export const Description = styled.p`
    max-width: 32rem;
    color: #eeeef3;
    font-size: clamp(0.9rem, 2.9cqw, 1.1rem);
    line-height: 1.45;
    text-wrap: pretty;
`;

export const Arrow = styled.span<AccentProps>`
    position: absolute;
    z-index: 3;
    top: clamp(1.25rem, 5cqw, 2rem);
    right: clamp(1.25rem, 5cqw, 2rem);
    display: grid;
    place-items: center;
    width: clamp(2.1rem, 7cqw, 2.75rem);
    aspect-ratio: 1;
    border: 1px solid ${accentColour};
    border-radius: 50%;
    background: rgba(12, 14, 20, 0.65);
    color: ${accentColour};
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

    svg {
        width: 50%;
        height: 50%;
    }
`;

export const CardLink = styled(Link)<AccentProps>`
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
        outline: 3px solid ${accentColour};
        outline-offset: 5px;
        border-color: ${accentColour};
    }

    &:focus-visible ${Frame} {
        opacity: 1;
        transform: scale(1);
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            transform: translateY(-4px);
            border-color: ${accentColour};
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
            background: ${accentColour};
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
