import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Label from './Label';
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';

export const Field = (props) => {
  const { tag: Tag, stack, ...rest } = props;
  return (
    <Tag {...rest} />
  );
};

Field.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  stack: PropTypes.bool,
};

Field.defaultProps = {
  tag: 'div',
};

Field.displayName = 'Field';

export default styled(Field)`
  display: flex;
  align-items: baseline;
  ${(props) => props.stack && 'flex-direction: column;'}
  margin-bottom: 1rem;

  ${Label} {
    ${(props) => !props.stack && `
      flex: 0 1 100px;
      max-width: 200px;
    `}
  }
  ${Input},
  ${Textarea},
  ${Select} {
    width: 100%;
  }
`;
