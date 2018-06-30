import tinyColor from 'tinycolor2';

const unitToPx = unit => unit * 16;
const highlight = '#c90044';
export const scaler = 1.6;

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
export const TYPE_SIZE = {
  small: [unitToPx(0.75), scaler],
  base: [unitToPx(1), scaler],
  t5: [unitToPx(1.3), scaler],
  t4: [unitToPx(1.5), scaler],
  t3: [unitToPx(2), 1.3],
  t2: [unitToPx(2.5), 1.2],
  t1: [unitToPx(3), 1.1],
  jumbo: [unitToPx(4), 1.1],
};

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
