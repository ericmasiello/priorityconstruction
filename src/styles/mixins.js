import { pxToRem } from './utils';

export const baseFont = () => 'font-family: \'Source Sans Pro\', sans-serif;';
export const headerFont = () => 'font-family: \'Lato\', sans-serif;';

export const type = typeDef => (
  `
    font-size: ${pxToRem(typeDef[0])};
    line-height: ${typeDef[1]};
  `
);

export const scalableType = (
  [maxSize, lineHeight],
  minSize = 16,
) => {
  const relativeScaler = 10;
  return `
    font-size: 10vw;
    line-height: ${lineHeight};

    @media(max-width: ${pxToRem(minSize * relativeScaler)}) {
      font-size: ${pxToRem(minSize)};
    }

    @media(min-width: ${pxToRem(maxSize * relativeScaler)}) {
      font-size: ${pxToRem(maxSize)};
    }
  `;
};
