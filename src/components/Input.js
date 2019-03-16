import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';
import { COLORS, BODY_WEIGHTS } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import * as CustomPropTypes from '../propTypes';
import tick from '../images/tick.svg';

const border = tinyColor(COLORS.gray[0])
  .setAlpha(0.5)
  .toRgbString();

const commonStyles = `
  border-style: solid;
  border-color: ${border};
  border-width: 1px;
  background-color: ${tinyColor(COLORS.bg)
    .setAlpha(0.7)
    .toRgbString()};
  box-shadow: 0 3px 0 ${tinyColor(COLORS.gray[1])
    .darken(20)
    .toRgbString()};
`;

const Checkmark = styled.span`
  justify-content: center;
  width: ${pxToRem(20)};
  height: ${pxToRem(20)};
  border: 1px solid ${COLORS.border};
  position: relative;
  flex-shrink: 0;
  ${({ error }) => error && `border-color: ${COLORS.error};`};
`;

/* eslint-disable jsx-a11y/label-has-associated-control */
export const Checkbox = ({ children, error, className, ...rest }) => (
  <label className={className}>
    <input {...rest} />
    <Checkmark error={error} />
    {children && <LabelText>{children}</LabelText>}
  </label>
);

Checkbox.propTypes = {
  tag: CustomPropTypes.Tag,
  className: PropTypes.string,
  children: PropTypes.node,
  error: PropTypes.bool,
};

Checkbox.defaultProps = {
  tag: 'input',
};

Checkbox.displayName = 'Checkbox';

export const StyledCheckbox = styled(Checkbox)`
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: hidden;

  input {
    position: absolute;
    left: -9999px;
  }

  input:checked + ${Checkmark} {
    &::before {
      content: '';
      position: absolute;
      width: 1em;
      height: 1em;
      left: 50%;
      top: 50%;
      background-image: url(${tick});
      background-repeat: no-repeat;
      background-position: center;
      transform: translateX(-50%) translateY(-50%);
    }
  }
`;

const RadioMark = styled.span`
  justify-content: center;
  border-radius: 50%;
  width: ${pxToRem(20)};
  height: ${pxToRem(20)};
  border: 1px solid ${COLORS.border};
  position: relative;
  flex-shrink: 0;
  ${({ error }) => error && `border-color: ${COLORS.error};`};
`;

const LabelText = styled.span`
  margin-left: 0.5rem;
`;

/* eslint-disable jsx-a11y/label-has-associated-control */
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

export const StyledRadio = styled(Radio)`
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

export const Input = ({ tag: Tag, error, ...rest }) => <Tag {...rest} />;

Input.propTypes = {
  tag: CustomPropTypes.Tag,
  error: PropTypes.bool,
};

Input.defaultProps = {
  tag: 'input',
};

Input.displayName = 'Input';

export const StyledInput = styled(Input)`
  ${commonStyles};
  font-weight: ${BODY_WEIGHTS.medium};
  padding: 0.5rem;

  &::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    font-weight: ${BODY_WEIGHTS.regular};
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    font-weight: ${BODY_WEIGHTS.regular};
  }
  &:-ms-input-placeholder {
    /* IE 10+ */
    font-weight: ${BODY_WEIGHTS.regular};
  }
  &:-moz-placeholder {
    /* Firefox 18- */
    font-weight: ${BODY_WEIGHTS.regular};
  }

  ${({ error }) => error && `border-color: ${COLORS.error}`};
`;

export const Textarea = ({ tag: Tag, error, ...rest }) => <Tag {...rest} />;

Textarea.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  error: PropTypes.bool,
};

Textarea.defaultProps = {
  tag: 'textarea',
};

Textarea.displayName = 'Textarea';

export const StyledTextarea = styled(Textarea)`
  ${commonStyles};
  font-weight: ${BODY_WEIGHTS.medium};
  padding: 0.5rem;
  ${({ error }) => error && `border-color: ${COLORS.error}`};
`;

export const SelectElement = styled.select`
  position: relative;
  z-index: 2;
  padding: 0.5rem 1.25rem 0.5rem 0.5rem;
  appearance: none;
  background-color: transparent;
  border: none;
  width: 100%;
`;

export const Select = props => {
  const { tag: Tag, className, children, ...rest } = props;
  return (
    <Tag className={className}>
      <SelectElement {...rest}>{children}</SelectElement>
    </Tag>
  );
};

Select.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  children: PropTypes.node,
};

Select.defaultProps = {
  tag: 'span',
};

Select.displayName = 'Select';

export const StyledSelect = styled(Select)`
  ${commonStyles};
  position: relative;
  display: inline-block;
  font-weight: ${BODY_WEIGHTS.medium};

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

const Component = props => {
  switch (props.type) {
    case 'radio':
      return <StyledRadio {...props} />;
    case 'checkbox':
      return <StyledCheckbox {...props} />;
    case 'textarea':
      return <StyledTextarea {...props} />;
    case 'select':
      return <StyledSelect {...props} />;
    default:
      return <StyledInput {...props} />;
  }
};

Component.displayName = 'InputWrapper';

Component.propTypes = {
  type: PropTypes.string,
};

export default styled(Component)``;
