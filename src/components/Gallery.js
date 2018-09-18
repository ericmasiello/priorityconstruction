import styled from 'styled-components';
import List from './List';
import ListItem from './ListItem';
import { pxToRem } from '../styles/utils';

const Gallery = styled(List)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${pxToRem(300)}, 1fr));
  grid-gap: 0.5rem;
`;

Gallery.Item = styled(ListItem)`
  &:not(:last-child) {
    margin-bottom: 0;
  }
`;

export default Gallery;
