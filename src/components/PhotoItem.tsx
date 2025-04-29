// src/components/PhotoItem.tsx
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import fullscreen from "../assets/icons/fullscreen.png";
import info from "../assets/icons/info.png";

export interface PhotoMetadata {
    type?: string;
    size?: string;
    dimensions?: string;
    cameraMarker?: string;
    cameraModel?: string;
    fStop?: string;
    exposureTime?: string;
    isoSpeed?: string;
    exposureBias?: string;
    focalLength?: string;
    maxAperture?: string;
    meteringMode?: string;
    flashMode?: string;
    focal35?: string;
}

interface PhotoItemProps {
    photo: string; // full-res image path
    alt?: string;
    metadata: PhotoMetadata;
}

/* Preview container */
const PhotoContainer = styled.div`
    position: relative;
    display: inline-block;
    cursor: pointer;
    overflow: hidden;
    max-width: 600px; /* Adjust preview size here */
    margin: auto;
`;

const Image = styled.img`
    display: block;
    width: 100%;
    height: auto;
`;

/* Info icon (top-right) */
const InfoButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    padding: 4px;
    cursor: pointer;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s ease;

    ${PhotoContainer}:hover & {
        opacity: 1;
    }
`;

/* Enlarge icon (bottom-right) */
const EnlargeButton = styled.button`
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: transparent;
    border: none;
    padding: 4px;
    cursor: pointer;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s ease;

    ${PhotoContainer}:hover & {
        opacity: 1;
    }
`;

/* InfoBox tooltip with fade in/out */
const InfoBox = styled.div`
    position: absolute;
    top: 40px;
    right: 8px;
    background: rgba(255, 255, 255, 0.9);
    color: #000;
    padding: 8px;
    border-radius: 4px;
    z-index: 3;
    font-size: 12px;
    max-width: 90%;
    transition: opacity 0.3s ease;
`;

/* Modal overlay */
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

/* Modal content that scales with content height.
   It defaults to a horizontal layout, but switches to vertical when the viewport width is very small. */
const ModalContent = styled.div`
    position: relative;
    background: ${({theme}) => theme.colors.background1};
    padding: 30px;
    border-radius: 8px;
    width: 90%;
    max-height: 90%;
    overflow: auto;
    display: flex;
    flex-direction: row;
    align-items: flex-start; /* Align children to the top */
    justify-content: center;
    gap: 20px;

    @media (max-width: 700px) {
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
`;

/* Close button aligned to the right edge of the modal content */
const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 28px;
    cursor: pointer;
`;

/* Image container (let it size naturally) */
const ModalImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalImage = styled.img`
    max-width: 100%;
    height: auto;
    max-height: 80vh;
    object-fit: contain;
`;

/* Metadata container that sizes to content */
const EnlargeMetadata = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* start items at the top */
    color: ${({theme}) => theme.colors.text};
    font-size: 20px;
    overflow-y: auto;
    max-height: 80vh;
    padding-top: 20px; /* add padding to avoid overlap with the close button */
`;

/* Markdown-like metadata items */
const MetadataItem = styled.div`
    margin-bottom: 12px;
`;

const MetadataLabel = styled.span`
    font-size: 20px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.highlight1};
    margin-right: 6px;
`;

const MetadataValue = styled.span`
    font-size: 20px;
`;

/* Button to view the original image in a new tab */
const ViewOriginalButton = styled.button`
    background: ${({theme}) => theme.colors.highlight1};
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    margin-bottom: 12px;
    cursor: pointer;
`;

/* Enlarge modal component */
const EnlargeModal: React.FC<{ photo: string; metadata: PhotoMetadata; onClose: () => void }> = ({
                                                                                                     photo,
                                                                                                     metadata,
                                                                                                     onClose,
                                                                                                 }) => {
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <ModalImageContainer>
                    <ModalImage src={photo} alt="Full Resolution"/>
                </ModalImageContainer>
                <EnlargeMetadata>
                    <ViewOriginalButton onClick={() => window.open(photo, '_blank')}>
                        View Original
                    </ViewOriginalButton>
                    {metadata.type && (
                        <MetadataItem>
                            <MetadataLabel>Type:</MetadataLabel>
                            <MetadataValue>{metadata.type}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.size && (
                        <MetadataItem>
                            <MetadataLabel>Size:</MetadataLabel>
                            <MetadataValue>{metadata.size}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.dimensions && (
                        <MetadataItem>
                            <MetadataLabel>Dimensions:</MetadataLabel>
                            <MetadataValue>{metadata.dimensions}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.cameraMarker && (
                        <MetadataItem>
                            <MetadataLabel>Camera Marker:</MetadataLabel>
                            <MetadataValue>{metadata.cameraMarker}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.cameraModel && (
                        <MetadataItem>
                            <MetadataLabel>Camera Model:</MetadataLabel>
                            <MetadataValue>{metadata.cameraModel}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.fStop && (
                        <MetadataItem>
                            <MetadataLabel>F-stop:</MetadataLabel>
                            <MetadataValue>{metadata.fStop}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.exposureTime && (
                        <MetadataItem>
                            <MetadataLabel>Exposure Time:</MetadataLabel>
                            <MetadataValue>{metadata.exposureTime}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.isoSpeed && (
                        <MetadataItem>
                            <MetadataLabel>ISO Speed:</MetadataLabel>
                            <MetadataValue>{metadata.isoSpeed}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.exposureBias && (
                        <MetadataItem>
                            <MetadataLabel>Exposure Bias:</MetadataLabel>
                            <MetadataValue>{metadata.exposureBias}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.focalLength && (
                        <MetadataItem>
                            <MetadataLabel>Focal Length:</MetadataLabel>
                            <MetadataValue>{metadata.focalLength}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.maxAperture && (
                        <MetadataItem>
                            <MetadataLabel>Max Aperture:</MetadataLabel>
                            <MetadataValue>{metadata.maxAperture}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.meteringMode && (
                        <MetadataItem>
                            <MetadataLabel>Metering Mode:</MetadataLabel>
                            <MetadataValue>{metadata.meteringMode}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.flashMode && (
                        <MetadataItem>
                            <MetadataLabel>Flash Mode:</MetadataLabel>
                            <MetadataValue>{metadata.flashMode}</MetadataValue>
                        </MetadataItem>
                    )}
                    {metadata.focal35 && (
                        <MetadataItem>
                            <MetadataLabel>35 Focal Length:</MetadataLabel>
                            <MetadataValue>{metadata.focal35}</MetadataValue>
                        </MetadataItem>
                    )}
                </EnlargeMetadata>
            </ModalContent>
        </ModalOverlay>
    );
};

const PhotoItem: React.FC<PhotoItemProps> = ({photo, alt, metadata}) => {
    // Compute preview image path by inserting "_preview" before the extension
    const previewPhoto = photo.replace(/(\.[^.]+)$/, '_preview$1');
    const [imgSrc, setImgSrc] = useState(previewPhoto);
    const [showInfoBox, setShowInfoBox] = useState(false);
    const [showEnlargeModal, setShowEnlargeModal] = useState(false);

    // Fallback to full-res image if preview fails
    const handleImgError = () => {
        if (imgSrc !== photo) {
            setImgSrc(photo);
        }
    };

    useEffect(() => {
        setImgSrc(previewPhoto);
    }, [photo, previewPhoto]);

    return (
        <>
            <PhotoContainer>
                <Image src={imgSrc} alt={alt || 'Photo'} onError={handleImgError}/>
                {/* Info icon */}
                <InfoButton
                    onMouseEnter={() => setShowInfoBox(true)}
                    onMouseLeave={() => setShowInfoBox(false)}
                >
                    <img src={info} alt="Info" width="24" height="24"/>
                </InfoButton>
                <InfoBox style={{opacity: showInfoBox ? 1 : 0}}>
                    {metadata.type && <p><strong>Type:</strong> {metadata.type}</p>}
                    {metadata.size && <p><strong>Size:</strong> {metadata.size}</p>}
                    {metadata.dimensions && <p><strong>Dimensions:</strong> {metadata.dimensions}</p>}
                    {metadata.cameraModel && <p><strong>Camera Model:</strong> {metadata.cameraModel}</p>}
                </InfoBox>
                {/* Enlarge icon */}
                <EnlargeButton onClick={() => setShowEnlargeModal(true)}>
                    <img src={fullscreen} alt="Enlarge" width="24" height="24"/>
                </EnlargeButton>
            </PhotoContainer>

            {showEnlargeModal && (
                <EnlargeModal
                    photo={photo}
                    metadata={metadata}
                    onClose={() => setShowEnlargeModal(false)}
                />
            )}
        </>
    );
};

export default PhotoItem;
