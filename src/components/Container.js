import styled from 'styled-components';
import { MAX_CONTENT_WIDTH } from '../styles/vars';
import { pxToRem } from '../styles/utils';

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${pxToRem(MAX_CONTENT_WIDTH)};
`;

export default Container;
