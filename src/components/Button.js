import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';
import { COLORS, BODY_WEIGHTS } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import * as CustomPropTypes from '../propTypes';

export const Button = ({ tag: Tag, color, large, ...rest }) => <Tag {...rest} />;

Button.propTypes = {
  tag: CustomPropTypes.Tag,
  color: PropTypes.oneOf(['light']),
  large: PropTypes.bool,
};

Button.defaultProps = {
  tag: 'button',
};

Button.displayName = 'Button';

export default styled(Button)`
  border: 1px solid
    ${tinyColor(COLORS.base)
      .lighten(20)
      .toRgbString()};
  font-weight: ${BODY_WEIGHTS.medium};
  background-color: ${COLORS.bg};
  border-radius: 2px;
  text-transform: uppercase;
  ${({ large }) =>
    large ? `padding: ${pxToRem(12)} ${pxToRem(24)}` : `padding: ${pxToRem(8)} ${pxToRem(24)}`};
  transition: background-color 0.2s;
  min-height: ${pxToRem(38)};

  &:hover,
  &:focus {
    border-color: ${COLORS.base};
    background-color: ${tinyColor(COLORS.bg)
      .darken(10)
      .setAlpha(0.5)
      .toRgbString()};
  }

  ${({ color }) => {
    switch (color) {
      case 'light':
        return `
          background-color: ${COLORS.brand[1]};
          border-color: ${COLORS.brand[1]};
          color: ${COLORS.base};

          &:hover,
          &:focus {
            background-color: ${tinyColor(COLORS.brand[1])
              .lighten(7)
              .toRgbString()};
            border-color: ${COLORS.brand[1]};
          }
        `;
      default:
        return '';
    }
  }};

  &:disabled {
    pointer-events: none;
    border-color: ${tinyColor(COLORS.muted)
      .lighten(30)
      .toRgbString()};
    color: ${COLORS.muted};
    background-color: ${tinyColor(COLORS.muted)
      .lighten(40)
      .toRgbString()};
  }
`;
