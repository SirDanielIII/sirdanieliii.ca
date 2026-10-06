import {useJson} from '../../../shared/media/useJson';

export interface PhotoMetadata {
    file: {type: string | null; size_bytes: number | null};
    image: {width: number | null; height: number | null};
    capture: {
        date_taken: string | null;
        camera: string | null;
        f_stop: number | null;
        exposure_time_seconds: number | null;
        iso_speed: number | null;
        exposure_bias_ev: number | null;
        focal_length_mm: number | null;
        max_aperture_f_stop: number | null;
        metering_mode: string | null;
        flash_mode: string | null;
        focal_length_35mm: number | null;
    };
}

export interface Photo {
    id: string;
    filename: string;
    preview_filename: string | null;
    src: string;
    preview_src: string | null;
    title: string;
    description: string;
    alt: string;
    category: string;
    category_title: string;
    width: number | null;
    height: number | null;
    weighting: number;
    metadata: PhotoMetadata;
}

export interface PhotographyCategory {
    id: string;
    title: string;
    status: 'published' | 'coming-soon';
    count: number;
}

export interface PhotographyGallery {
    schema_version: number;
    categories: PhotographyCategory[];
    photos: Photo[];
}

function isGallery(value: unknown): value is PhotographyGallery {
    if (!value || typeof value !== 'object') return false;
    const gallery = value as Partial<PhotographyGallery>;
    return gallery.schema_version === 1 && Array.isArray(gallery.photos) && Array.isArray(gallery.categories);
}

export function usePhotography() {
    return useJson('/scripts/list_photography.php', isGallery);
}

export const gallerySource = (photo: Photo) => photo.preview_src ?? photo.src;
export const photoAspectRatio = (photo: Photo) => photo.width && photo.height ? `${String(photo.width)} / ${String(photo.height)}` : '3 / 2';

const numeric = (value: number | null, maximumFractionDigits = 1): string | null =>
    value !== null && Number.isFinite(value) ? value.toLocaleString('en-CA', {maximumFractionDigits}) : null;
const withUnit = (value: number | null, unit: string, prefix = '') => {
    const formatted = numeric(value);
    return formatted === null ? '—' : `${prefix}${formatted}${unit}`;
};

/** One missing-value convention, using only the requested fields rather than a raw EXIF dump. */
export function metadataRows(photo: Photo): [string, string][] {
    const {file, image, capture} = photo.metadata;
    const size = file.size_bytes;
    const exposure = capture.exposure_time_seconds;
    let exposureText = '—';
    if (exposure !== null && Number.isFinite(exposure) && exposure > 0) {
        const reciprocal = 1 / exposure;
        const denominator = Math.round(reciprocal);
        exposureText = exposure < 1 && Math.abs(reciprocal - denominator) / reciprocal < 0.01
            ? `1/${String(denominator)} sec`
            : `${numeric(exposure, 6) ?? '—'} sec`;
    }
    return [
        ['Type', file.type ?? '—'],
        // Decimal MB matches the requested display unit; the JSON keeps the precise byte count.
        ['Size', size !== null && size > 0 ? `${numeric(size / 1_000_000) ?? '—'} MB (${size.toLocaleString('en-CA')} bytes)` : '—'],
        // EXIF capture times are local unless an offset was supplied. Display without timezone conversion.
        ['Date Taken', capture.date_taken?.replace('T', ' ') ?? '—'],
        ['Dimensions', image.width && image.height ? `${numeric(image.width, 0) ?? '—'} × ${numeric(image.height, 0) ?? '—'} pixels` : '—'],
        ['Camera', capture.camera ?? '—'],
        ['F-stop', withUnit(capture.f_stop, '', 'f/')],
        ['Exposure Time', exposureText],
        ['ISO Speed', withUnit(capture.iso_speed, '', 'ISO ')],
        ['Exposure Bias', withUnit(capture.exposure_bias_ev, ' EV', (capture.exposure_bias_ev ?? 0) > 0 ? '+' : '')],
        ['Focal Length', withUnit(capture.focal_length_mm, ' mm')],
        ['Max Aperture', withUnit(capture.max_aperture_f_stop, '', 'f/')],
        ['Metering Mode', capture.metering_mode ?? '—'],
        ['Flash Mode', capture.flash_mode ?? '—'],
        ['35 mm Focal Length', withUnit(capture.focal_length_35mm, ' mm')],
    ];
}
