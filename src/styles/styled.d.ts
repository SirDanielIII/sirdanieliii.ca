import 'styled-components';
import type {AppTheme} from './theme';

declare module 'styled-components' {
    // Module augmentation intentionally inherits the application's complete theme shape.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends AppTheme {}
}
