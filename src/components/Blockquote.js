import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
  padding-left: 2rem;
  padding-right: 2rem;
`;
