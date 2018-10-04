import tinyColor from 'tinycolor2';

const unitToPx = unit => unit * 16;
const baseColor = '#424141';
export const scaler = 1.333;

export const COLORS = {
  bg: '#fff',
  base: baseColor,
  muted: '#787575',
  highlight: '#FBDB1E',
  highlight2: '#4D1017',
  highlight3: tinyColor('#385072')
    .darken(5)
    .toRgbString(),
  link: '#18232C',
  border: tinyColor(baseColor)
    .lighten(50)
    .toRgbString(),
  placeholder: '#D8D8D8',
  error: '#cc0000',
};

export const MAX_CONTENT_WIDTH = 1200;

export const PAGE_SPACING = {
  horizontal: 20,
};

export const MEDIA_QUERIES = {
  navTransition: 800,
};

// type properties
export const TYPE_SIZE = {
  small: [unitToPx(0.8125), 1.5],
  base: [unitToPx(1), 1.5],
  t5: [unitToPx(scaler), 1.5],
  t4: [unitToPx(scaler ** 2), 1.3],
  t3: [unitToPx(scaler ** 3), 1.2],
  t2: [unitToPx(scaler ** 4), 1.2],
  t1: [unitToPx(scaler ** 5), 1.1],
  jumbo: [unitToPx(scaler ** 6), 1.1],
};

export const BODY_WEIGHTS = {
  regular: 400,
  medium: 500,
  bold: 600,
};

const getNumericWeights = weights =>
  Object.keys(weights)
    .map(key => weights[key])
    .join(',');

export const BODY_FONT_STACK = "'Montserrat', sans-serif";

export const FONT_URL = [
  'https://fonts.googleapis.com/css?family=',
  `Montserrat:${getNumericWeights(BODY_WEIGHTS)}`,
].join('');
