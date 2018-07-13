import tinyColor from 'tinycolor2';

const unitToPx = unit => unit * 16;
const baseColor = '#424141';
export const scaler = 1.5;

export const COLORS = {
  bg: '#fff',
  base: baseColor,
  muted: '#787575',
  highlight: '#FBDB1E',
  highlight2: '#4D1017',
  highlight3: '#002B6D',
  link: '#18232C',
  border: tinyColor(baseColor).lighten(50).toRgbString(),
};

export const MAX_CONTENT_WIDTH = 1024;

export const PAGE_SPACING = {
  horizontal: 20,
};

// type properties
export const TYPE_SIZE = {
  small: [unitToPx(0.8125), scaler],
  base: [unitToPx(1), scaler],
  t5: [unitToPx(1.3), scaler],
  t4: [unitToPx(1.5), scaler],
  t3: [unitToPx(2), 1.3],
  t2: [unitToPx(2.5), 1.2],
  t1: [unitToPx(3), 1.1],
  jumbo: [unitToPx(4), 1.1],
};

export const BODY_WEIGHTS = {
  regular: 400,
  medium: 500,
  bold: 600,
};

const getNumericWeights = weights => (
  Object.keys(weights)
    .map(key => weights[key])
    .join(',')
);

export const BODY_FONT_STACK = '\'Montserrat\', sans-serif';

export const FONT_URL = [
  'https://fonts.googleapis.com/css?family=',
  `Montserrat:${getNumericWeights(BODY_WEIGHTS)}`,
].join('');
