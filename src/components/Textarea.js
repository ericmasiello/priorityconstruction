import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLORS, BODY_WEIGHTS } from '../styles/vars';

export const Textarea = ({ tag: Tag, error, ...rest }) => <Tag {...rest} />;

Textarea.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  error: PropTypes.bool,
};

Textarea.defaultProps = {
  tag: 'textarea',
};

Textarea.displayName = 'Textarea';

export default styled(Textarea)`
  border: 1px solid ${COLORS.border};
  font-weight: ${BODY_WEIGHTS.medium};
  background-color: ${COLORS.bg};
  padding: 0.5rem;
  ${({ error }) => error && `border-color: ${COLORS.error}`};
`;
