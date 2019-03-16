import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';
import QuoteMarksIcon from './QuoteMarksIcon';
import { COLORS } from '../styles/vars';

const Content = styled.div`
  position: relative;
`;

export const Blockquote = ({ tag: Tag, children, quoteColor, ...rest }) => (
  <Tag {...rest}>
    <Content>
      {children}
      <QuoteMarksIcon aria-hidden="true" />
    </Content>
  </Tag>
);

Blockquote.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  quoteColor: PropTypes.string,
  children: PropTypes.node,
};

Blockquote.defaultProps = {
  tag: 'blockquote',
};

Blockquote.displayName = 'Blockquote';

const StyledBlockquote = styled(Blockquote)`
  display: flex;
  align-items: center;
  padding: 2rem 2rem 4rem;

  ${QuoteMarksIcon} {
    fill: ${({ quoteColor }) => quoteColor};
    height: 2.25rem;
    position: absolute;
    bottom: 0;
    right: 0.5rem;
    transform: translateY(150%);
  }
`;

StyledBlockquote.propTypes = {
  quoteColor: PropTypes.string,
};

StyledBlockquote.defaultProps = {
  quoteColor: tinyColor(COLORS.brand[1])
    .setAlpha(0.6)
    .toRgbString(),
};

export default StyledBlockquote;
