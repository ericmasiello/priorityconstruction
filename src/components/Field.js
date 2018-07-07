import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Label from './Label';
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';

const isLabel = (child) => child.type.displayName === Label.displayName;
const isFormField = (child) => {
  if (child.type.displayName === Input.displayName
    || child.type.displayName === Textarea.displayName
    || child.type.displayName === Select.displayName) {
    return true;
  }
  return false;
};

const applyNameAs = (child, nameAs) => {
  if (!nameAs) {
    return child;
  }

  if (isLabel(child)) {
    return React.cloneElement(child, Object.assign({
      htmlFor: nameAs,
    }, child.props));
  }

  if (isFormField(child)) {
    return React.cloneElement(child, Object.assign({
      id: nameAs,
      name: nameAs,
    }, child.props));
  }
  return child;
}

export const Field = (props) => {
  const {
    tag: Tag,
    nameAs,
    children,
    stack,
    ...rest
  } = props;
  return (
    <Tag {...rest}>
      {React.Children.map(children, (child) => applyNameAs(child, nameAs))}
    </Tag>
  );
};

Field.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  stack: PropTypes.bool,
  children: PropTypes.node,
  nameAs: PropTypes.string,
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
