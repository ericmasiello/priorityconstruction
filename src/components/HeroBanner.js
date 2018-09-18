import styled from 'styled-components';
import Type1 from './Type1';
import { COLORS } from '../styles/vars';

export default styled(Type1)`
  position: relative;
  z-index: 2;
  color: ${COLORS.highlight};
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 0;
`;
