import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';
import { pxToRem } from '../styles/utils';
import { COLORS, BODY_WEIGHTS } from '../styles/vars';

export const BlockquoteCitation = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

BlockquoteCitation.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

BlockquoteCitation.defaultProps = {
  tag: 'footer',
};

BlockquoteCitation.displayName = 'Blockquote.Citation';

const StyledBlockquoteCitation = styled(BlockquoteCitation)``;

export const BlockquoteQuote = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

BlockquoteQuote.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

BlockquoteQuote.defaultProps = {
  tag: 'p',
};

BlockquoteQuote.displayName = 'Blockquote.Quote';

const StyledBlockquoteQuote = styled(BlockquoteQuote)`
  &::before {
    content: '\\201C';
  }

  &::after {
    content: '\\201D';
  }
`;

export const Blockquote = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

Blockquote.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Blockquote.defaultProps = {
  tag: 'blockquote',
};

Blockquote.displayName = 'Blockquote';

const StyledBlockquote = styled(Blockquote)`
  position: relative;
  padding-left: 2rem;
  padding-right: 2rem;
`;

StyledBlockquote.Quote = StyledBlockquoteQuote;
StyledBlockquote.Citation = StyledBlockquoteCitation;

export default StyledBlockquote;
