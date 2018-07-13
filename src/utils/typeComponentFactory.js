import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { type, scalableType } from '../styles/mixins';

const typeComponentFactory = (
  typeSize,
  { defaultTag = 'div', displayName = `Type(${typeSize})` } = {},
) => {
  const Type = props => {
    const { tag: Tag, scale, ...rest } = props;
    return <Tag {...rest} />;
  };

  Type.defaultProps = {
    tag: defaultTag,
    scale: true,
  };

  Type.propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    className: PropTypes.string,
    scale: PropTypes.bool,
  };

  Type.displayName = displayName;

  const StyledType = styled(Type)`
    ${props =>
      ({ ...Type.defaultProps, ...props }.scale ? scalableType(typeSize) : type(typeSize))};
  `;

  return {
    Type,
    StyledType,
  };
};

export default typeComponentFactory;
