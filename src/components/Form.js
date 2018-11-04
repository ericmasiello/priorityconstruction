import styled from 'styled-components';
import Input, { StyledTextarea } from './Input';
import Button from './Button';
import Label from './Label';
import { pxToRem } from '../styles/utils';

const Form = styled.form`
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

export default Form;
