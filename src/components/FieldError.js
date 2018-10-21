import { ErrorMessage } from 'formik';
import styled from 'styled-components';
import { COLORS, TYPE_SIZE } from '../styles/vars';
import { pxToRem } from '../styles/utils';

const FieldError = styled(ErrorMessage)`
  color: ${COLORS.error};
  font-size: ${pxToRem(TYPE_SIZE.small[0])};
  line-height: ${TYPE_SIZE.small[1]};
`;

FieldError.displayName = 'FieldError';

export default FieldError;
