import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Quote = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

Quote.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Quote.defaultProps = {
  tag: 'p',
};

Quote.displayName = 'Quote';

export default styled(Quote)`
  > *:first-child::before {
    content: '\\201C';
  }

  > *:last-child::after {
    content: '\\201D';
  }
`;
