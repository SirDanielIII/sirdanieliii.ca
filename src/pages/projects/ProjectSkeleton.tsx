import React from 'react';

import {
    SkeletonCard,
    SkeletonArtwork,
    SkeletonContent,
    SkeletonLine,
    SkeletonTags,
    SkeletonTag,
    SkeletonActions,
    SkeletonAction,
} from '../../css/projects/ProjectSkeleton.styles';

const ProjectSkeleton: React.FC = () => (
    <SkeletonCard>
        <SkeletonArtwork/>
        <SkeletonContent>
            <SkeletonLine $width="62%" $height="clamp(1.45rem, 7.4cqw, 2.25rem)"/>
            <SkeletonLine $width="25%" $height="clamp(1rem, 5.1cqw, 1.5rem)"/>
            <SkeletonLine $width="94%"/>
            <SkeletonLine $width="82%"/>
            <SkeletonLine $width="56%"/>
            <SkeletonLine $width="72%"/>
            <SkeletonTags>
                <SkeletonTag/>
                <SkeletonTag/>
                <SkeletonTag/>
            </SkeletonTags>
            <SkeletonActions>
                <SkeletonAction/>
                <SkeletonAction/>
                <SkeletonAction/>
            </SkeletonActions>
        </SkeletonContent>
    </SkeletonCard>
);

export default ProjectSkeleton;
