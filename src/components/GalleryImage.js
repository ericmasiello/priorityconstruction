import styled from 'styled-components';
import GatsbyImage from './GatsbyImage';

const GalleryImage = styled(GatsbyImage)`
  height: 100%;
  z-index: 1;
  transition: transform 3s;

  &:hover {
    transform: scale(1.15);
  }
`;

export default GalleryImage;
