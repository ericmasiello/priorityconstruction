import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS } from '../styles/vars';

export const Placeholder = props => {
  const { tag: Tag, ...rest } = props;
  return <Tag {...rest} />;
};

Placeholder.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Placeholder.defaultProps = {
  tag: 'div',
};

Placeholder.displayName = 'Placeholder';

export default styled(Placeholder)`
  display: block;
  background-color: ${COLORS.placeholder};
  padding: 1rem;
`;
