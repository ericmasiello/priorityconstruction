import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';
import { COLORS, BODY_WEIGHTS } from '../styles/vars';

export const Button = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

Button.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Button.defaultProps = {
  tag: 'button',
};

Button.displayName = 'Button';

export default styled(Button)`
  border: 1px solid ${COLORS.base};
  font-weight: ${BODY_WEIGHTS.bold};
  background-color: ${COLORS.bg};
  text-transform: uppercase;
  padding: 0.5rem 1.5rem;
  transition: background-color 0.2s;

  &:hover, &:focus {
    background-color: ${tinyColor(COLORS.bg)
    .darken(4)
    .toRgbString()};
  }
`;
