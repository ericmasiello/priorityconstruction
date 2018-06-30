import tinyColor from 'tinycolor2';

const highlight = '#c90044';

export const COLORS = {
  bg: '#fff',
  base: '#424141',
  muted: '#787575',
  highlight,
  link: tinyColor(highlight)
    .setAlpha(0.6)
    .toRgbString(),
};

// type properties
export const HEADER_WEIGHTS = {
  medium: 400,
  bold: 700,
};

export const BODY_WEIGHTS = {
  light: 300,
  medium: 400,
  bold: 600,
};

const getNumericWeights = weights => (
  Object.keys(weights)
    .map(key => weights[key])
    .join(',')
);

export const FONT_URL = `https://fonts.googleapis.com/css?family=Lato:${getNumericWeights(HEADER_WEIGHTS)}|Source+Sans+Pro:${getNumericWeights(BODY_WEIGHTS)}`;
