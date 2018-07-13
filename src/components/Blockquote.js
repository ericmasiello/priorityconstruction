import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';
import { pxToRem } from '../styles/utils';
import { COLORS, BODY_WEIGHTS } from '../styles/vars';

export const Blockquote = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

Blockquote.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Blockquote.defaultProps = {
  tag: 'blockquote',
};

Blockquote.displayName = 'Blockquote';

export default styled(Blockquote)`
  position: relative;
  padding-left: 2em;
  padding-right: 2em;

  &::before,
  &::after {
    position: absolute;
    font-size: 300%;
    line-height: 50%;
    font-weight: ${BODY_WEIGHTS.bold};
    color: ${tinyColor(COLORS.base)
      .lighten(60)
      .toRgbString()};
  }

  &::before {
    content: '\\201C';
    left: 0;
    top: ${pxToRem(10)};
  }

  &::after {
    content: '\\201D';
    right: 0;
    bottom: ${pxToRem(10)};
  }
`;
