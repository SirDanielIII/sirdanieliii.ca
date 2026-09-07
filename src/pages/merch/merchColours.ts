import type {CSSProperties} from 'react';
import type {MerchCardColours, MerchColour} from './merch';

export const merchColourStyles = (
    colours: MerchCardColours,
    mode: 'light' | 'dark',
): CSSProperties => {
    const styles: CSSProperties & Record<`--merch-${string}`, string> = {};
    const entries: [string, MerchColour | undefined][] = Object.entries(colours);

    for (const [name, colour] of entries) {
        const resolved = typeof colour === 'string' ? colour : colour?.[mode];
        if (resolved !== undefined) styles[`--merch-card-${name}`] = resolved;
    }

    return styles;
};
