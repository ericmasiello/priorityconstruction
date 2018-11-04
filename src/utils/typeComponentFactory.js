import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { type, scalableType } from '../styles/mixins';
import { BODY_WEIGHTS } from '../styles/vars';

const typeComponentFactory = (
  typeSize,
  { defaultTag = 'div', displayName = `Type(${typeSize})` } = {},
) => {
  const Type = props => {
    const { tag: Tag, scale, uppercase, weight, ...rest } = props;
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
    uppercase: PropTypes.bool,
    weight: PropTypes.oneOf(['regular', 'medium', 'bold']),
  };

  Type.displayName = displayName;

  // TODO: add code for making type capitlize and bold
  const StyledType = styled(Type)`
    ${props => {
      const { scale, weight, uppercase } = { ...Type.defaultProps, ...props };
      const styles = [scale ? scalableType(typeSize) : type(typeSize)];
      if (weight && weight !== 'regular') {
        styles.push(`font-weight: ${BODY_WEIGHTS[weight]};`);
      }

      if (uppercase) {
        styles.push(`text-transform: uppercase;`);
      }

      return styles.join('');
    }};
  `;

  return {
    Type,
    StyledType,
  };
};

export default typeComponentFactory;
