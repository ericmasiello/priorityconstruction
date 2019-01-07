import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input, { StyledTextarea } from './Input';
import Button from './Button';
import Label from './Label';
import VisuallyHidden from './VisuallyHidden';
import { pxToRem } from '../styles/utils';

const NetlifyForm = ({ name, children, handleChange, ...rest }) => {
  const honeypot = `${name}-bot-field`;
  return (
    <form data-netlify="true" netlify-honeypot={honeypot} method="POST" name={name} {...rest}>
      <input type="hidden" name="form-name" value={name} />
      <VisuallyHidden hidden>
        {/* eslint-disable jsx-a11y/label-has-associated-control */}
        <label>
          Don&rsquo;t fill this out if you&rsquo;re human:
          {' '}
          <input name={honeypot} onChange={handleChange} />
        </label>
      </VisuallyHidden>
      {children}
    </form>
  );
};

NetlifyForm.displayName = 'NetlifyForm';

NetlifyForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
};

const StyledNetlifyForm = styled(NetlifyForm)`
  ${Input} {
    width: 100%;
  }

  ${StyledTextarea} {
    min-height: ${pxToRem(250)};
  }

  ${Label} {
    &:not(:first-of-type) {
      margin-top: 0.75rem;
    }
  }

  ${VisuallyHidden} ${Label} {
    margin-top: 0.75rem;
  }

  ${Button}, fieldset {
    margin-top: 0.75rem;
  }
`;

export default StyledNetlifyForm;
