import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLORS, BODY_WEIGHTS } from '../styles/vars';

export const SelectElement = styled.select`
  position: relative;
  z-index: 2;
  padding: 0.5rem 1.25rem 0.5rem 0.5rem;
  appearance: none;
  background-color: transparent;
  border: none;
`;

export const Select = ({ tag: Tag, children, ...rest }) => (
  <Tag {...rest}>
    <SelectElement>
      {children}
    </SelectElement>
  </Tag>
);

Select.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
};

Select.defaultProps = {
  tag: 'span',
};

Select.displayName = 'Select';

export default styled(Select)`
  position: relative;
  display: inline-block;
  border: 1px solid ${COLORS.border};
  font-weight: ${BODY_WEIGHTS.medium};
  background-color: ${COLORS.bg};

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    width: 0; 
    height: 0; 
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 4px solid ${COLORS.base};
  }
`;
