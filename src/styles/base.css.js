import { pxToRem } from './utils';
import { baseFont, headerFont } from './mixins';
import { COLORS, BODY_WEIGHTS, FONT_URL, scaler } from './vars';

export default `
@import url('${FONT_URL}');

  html {
    box-sizing: border-box;
    background-color: ${COLORS.bg};
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  html {
    ${baseFont()};
    color: ${COLORS.base};
    font-size: 100%;
  }

  body {
    margin: 0;
    font-size: ${pxToRem(16)};
    line-height: ${scaler};
    font-weight: ${BODY_WEIGHTS.regular};
  }

  input, textarea, select, button {
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
  }

  label,
  input[type=button],
  input[type=submit],
  input[type=reset],
  button {
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6 {
    ${headerFont()};
    font-weight: ${BODY_WEIGHTS.regular};
    line-height: 1.1;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  a {
    background-color: transparent;
    color: ${COLORS.link};
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  abbr {
    position: relative;
    text-decoration: none;

    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      width: 100%;
      height: ${pxToRem(2)};
      left: 0;
      bottom: ${pxToRem(-3)};
      background-color: ${COLORS.base};
      opacity: 0.3;
    }
  }

  img, svg {
    max-width: 100%;
    height: auto;
  }

  img {
    vertical-align: middle;
    border: 0;
  }

  blockquote {
    margin: 0;
  }

  hr {
    border-width: 1px 0 0 0;
    border-style: solid;
  }

  address {
    font-style: normal;
  }

  fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }
`;
