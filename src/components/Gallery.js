import List from './List';
import { pxToRem } from '../styles/utils';

const Gallery = List.extend`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${pxToRem(300)}, 1fr));
  grid-gap: 0.5rem;
`;

Gallery.Item = List.Item.extend`
  &:not(:last-child) {
    margin-bottom: 0;
  }
`;

export default Gallery;
