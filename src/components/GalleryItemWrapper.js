import styled from 'styled-components';
import ListItem from './ListItem';

const GalleryItemWrapper = styled(ListItem)`
  &:not(:last-child) {
    margin-bottom: 0;
  }
`;

export default GalleryItemWrapper;
