import styled from 'styled-components';
import { COLORS } from '../styles/vars';

const FormSuccessMessage = styled.div`
  background-color: ${COLORS.highlight3};
  color: #fff;
  display: flex;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transition: height 0.5s, padding 0.8s;
  overflow: hidden;
  padding-left: 3vw;
  padding-right: 3vw;
  z-index: 3;
  ${({ show }) =>
    show
      ? `
          height: 100%;
          padding-top: 6vh;
          padding-bottom: 6vh;
      `
      : `height: 0`};
`;

export default FormSuccessMessage;
