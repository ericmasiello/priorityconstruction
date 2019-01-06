import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input, { StyledTextarea } from './Input';
import Button from './Button';
import Label from './Label';
import { pxToRem } from '../styles/utils';

const NetlifyForm = ({ name, children, ...rest }) => (
  <form data-netlify="true" method="POST" name={name} {...rest}>
    <input type="hidden" name="form-name" value={name} />
    {children}
  </form>
);

NetlifyForm.displayName = 'NetlifyForm';

NetlifyForm.propTypes = {
  name: PropTypes.string.isRequired,
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

  ${Button}, fieldset {
    margin-top: 0.75rem;
  }
`;

export default StyledNetlifyForm;
