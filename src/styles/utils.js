import { GUTTER_SIZE, GRID_SIZE } from './vars';

export const pxToRem = (value, base = 16) => `${value / base}rem`;

export const grids = (count = 1) => GRID_SIZE * count + GUTTER_SIZE * (count - 1);
