import '@emotion/react';
import { colors } from './colors';
import { fontSize } from './fontSize';
import { windowSize } from './windowSize';

interface MyType {
  colors: typeof colors;
  windowSize: typeof windowSize;
  fontSize: typeof fontSize;
}

declare module '@emotion/react' {
  export interface Theme extends MyType {}
}
