import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLORS, BODY_WEIGHTS } from '../styles/vars';

export const Input = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

Input.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Input.defaultProps = {
  tag: 'input',
};

Input.displayName = 'Input';

export default styled(Input)`
  border: 1px solid ${COLORS.border};
  font-weight: ${BODY_WEIGHTS.medium};
  background-color: ${COLORS.bg};
  padding: 0.5rem;
`;
