import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import QuoteMarksIcon from './QuoteMarksIcon';
import { COLORS } from '../styles/vars';

const Content = styled.div`
  position: relative;
`;

export const Blockquote = ({ tag: Tag, children, ...rest }) => (
  <Tag {...rest}>
    <Content>
      {children}
      <QuoteMarksIcon aria-hidden="true" />
    </Content>
  </Tag>
);

Blockquote.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Blockquote.defaultProps = {
  tag: 'blockquote',
};

Blockquote.displayName = 'Blockquote';

export default styled(Blockquote)`
  display: flex;
  align-items: center;
  padding: 2rem;

  ${QuoteMarksIcon} {
    fill: ${COLORS.brand[1]};
    opacity: 0.6;
    height: 2.25rem;
    position: absolute;
    bottom: 0;
    right: 0.5rem;
    transform: translateY(150%);
  }
`;
