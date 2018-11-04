import { pxToRem } from './utils';
import { BODY_FONT_STACK } from './vars';
import blueprint from '../images/blueprint.svg';
import grid from '../images/grid.svg';

export const baseFont = () => `font-family: ${BODY_FONT_STACK}`;
export const headerFont = () => `font-family: ${BODY_FONT_STACK}`;

export const type = typeDef =>
  `
    font-size: ${pxToRem(typeDef[0])};
    line-height: ${typeDef[1]};
  `;

export const scalableType = ([maxSize, lineHeight], minSize = 16) => {
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

export const siteBg = () => `
  min-height: 100vh;
  background-image: 
    url(${blueprint}),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%,rgba(255, 255, 255, 0.6) 100%),
    url(${grid});
  background-size:
    contain,
    100%,
    ${pxToRem(960)};
  background-repeat: 
    no-repeat,
    repeat,
    repeat;
  background-position: bottom left;
  display: grid;
  grid-template-rows: 1fr auto;
`;
