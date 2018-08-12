import List from './List';

const Gallery = List.extend`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 0.5rem;
`;

Gallery.Item = List.Item.extend`
  &:not(:last-child) {
    margin-bottom: 0;
  }
`;

export default Gallery;
