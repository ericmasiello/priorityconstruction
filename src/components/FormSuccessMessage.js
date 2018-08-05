import styled from 'styled-components';
import { COLORS } from '../styles/vars';

const FormSuccessMessage = styled.div`
  background-color: ${COLORS.highlight3};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transition: height 0.5s;
  overflow: hidden;
  padding-left: 3vw;
  padding-right: 3vw;
  ${({ show }) => (show ? `height: 100%` : `height: 0`)};
`;

export default FormSuccessMessage;
