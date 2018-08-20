import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';
import { COLORS, BODY_WEIGHTS } from '../styles/vars';
import * as CustomPropTypes from '../propTypes';

const RadioMark = styled.span`
  justify-content: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: 1px solid ${COLORS.border};
  position: relative;
  ${({ error }) => error && `border-color: ${COLORS.error};`};
`;

const LabelText = styled.span`
  margin-left: 0.5rem;
`;

export const Radio = ({ children, error, className, ...rest }) => (
  <label className={className}>
    <input {...rest} />
    <RadioMark error={error} />
    {children && <LabelText>{children}</LabelText>}
  </label>
);

Radio.propTypes = {
  tag: CustomPropTypes.Tag,
  className: PropTypes.string,
  children: PropTypes.node,
  error: PropTypes.bool,
};

Radio.defaultProps = {
  tag: 'input',
};

Radio.displayName = 'Radio';

const StyledRadio = styled(Radio)`
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: hidden;

  input {
    position: absolute;
    left: -9999px;
  }

  input:checked + ${RadioMark} {
    &::before {
      content: '';
      background-color: ${tinyColor(COLORS.border)
        .darken(40)
        .toRgbString()};
      border-radius: 50%;
      width: 10px;
      height: 10px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      ${({ error }) => error && `background-color: ${COLORS.error};`};
    }
  }
`;

export const Input = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

Input.propTypes = {
  tag: CustomPropTypes.Tag,
};

Input.defaultProps = {
  tag: 'input',
};

Input.displayName = 'Input';

const StyledInput = styled(Input)`
  border: 1px solid ${COLORS.border};
  font-weight: ${BODY_WEIGHTS.medium};
  background-color: ${COLORS.bg};
  padding: 0.5rem;

  ${({ error }) => error && `border-color: ${COLORS.error}`};
`;

const Component = props => {
  switch (props.type) {
    case 'radio':
      return <StyledRadio {...props} />;
    default:
      return <StyledInput {...props} />;
  }
};

Component.displayName = 'Input';

export default styled(Component)``;
