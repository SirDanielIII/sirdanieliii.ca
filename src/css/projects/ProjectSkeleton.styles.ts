import styled, {keyframes} from 'styled-components';

const skeletonPulse = keyframes`
    0%, 100% { opacity: 0.38; }
    50% { opacity: 0.72; }
`;

export const SkeletonCard = styled.div`
    width: 100%;
    min-width: 0;
    min-height: 0;
    aspect-ratio: 484 / 920;
    container-type: inline-size;
    border: clamp(3px, 0.3vw, 5px) solid ${({theme}) => theme.colors.sectionCard};
    background: ${({theme}) => theme.colors.background2};
    overflow: hidden;
`;

const SkeletonBlock = styled.div`
    background: ${({theme}) => theme.colors.sectionCard};
    animation: ${skeletonPulse} 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
        opacity: 0.55;
    }
`;

export const SkeletonArtwork = styled(SkeletonBlock)`
    width: 76%;
    margin: clamp(1.25rem, 8.25cqw, 2.5rem) auto 0;
    aspect-ratio: 1;

    @container (max-width: 19rem) {
        width: 68%;
        margin-top: 6cqw;
    }
`;

export const SkeletonContent = styled.div`
    padding: clamp(0.7rem, 4.1cqw, 1.25rem) clamp(1.2rem, 8.25cqw, 2.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(0.45rem, 2.6cqw, 0.8rem);
`;

export const SkeletonLine = styled(SkeletonBlock)<{ $width: string; $height?: string }>`
    width: ${({$width}) => $width};
    height: ${({$height}) => $height ?? '1.15rem'};
    border-radius: 0.3rem;
`;

export const SkeletonTags = styled.div`
    width: 100%;
    margin-top: 0.6rem;
    display: flex;
    justify-content: center;
    gap: 0.65rem;
`;

export const SkeletonTag = styled(SkeletonBlock)`
    width: clamp(4rem, 18cqw, 5.5rem);
    height: clamp(1.5rem, 7cqw, 2.1rem);
    border-radius: 9px;
`;

export const SkeletonActions = styled.div`
    width: 100%;
    margin-top: 1.1rem;
    display: flex;
    justify-content: center;
    gap: 0.75rem;
`;

export const SkeletonAction = styled(SkeletonBlock)`
    flex: 1;
    max-width: clamp(5.5rem, 25cqw, 7.75rem);
    height: clamp(3rem, 15.4cqw, 4.65rem);
    border-radius: 20px;
`;
