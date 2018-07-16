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
  border: 1px solid ${COLORS.base};
  font-weight: ${BODY_WEIGHTS.medium};
  background-color: ${COLORS.bg};
  text-transform: uppercase;
  ${({ large }) =>
    large ? `padding: ${pxToRem(12)} ${pxToRem(24)}` : `padding: ${pxToRem(8)} ${pxToRem(24)}`};
  transition: background-color 0.2s;
  min-height: ${pxToRem(38)};

  &:hover,
  &:focus {
    background-color: ${tinyColor(COLORS.bg)
      .darken(4)
      .toRgbString()};
  }

  ${({ color }) => {
    switch (color) {
      case 'light':
        return `
          background-color: ${COLORS.highlight};
          border-color: ${COLORS.highlight};
          color: ${COLORS.base};

          &:hover,
          &:focus {
            background-color: ${tinyColor(COLORS.highlight)
              .lighten(7)
              .toRgbString()};
          }
        `;
      default:
        return '';
    }
  }};
`;
