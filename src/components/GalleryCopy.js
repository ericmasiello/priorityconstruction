import styled from 'styled-components';
import tinyColor from 'tinycolor2';
import { BODY_WEIGHTS } from '../styles/vars';

const GalleryCopy = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s ease-in;
  transform: translateY(100%);

  @media (hover: none) {
    transform: translateY(0);
  }

  p,
  h4 {
    margin-bottom: 0;
    padding-left: 0.25rem;
    padding-right: 0.25rem;

    background-color: ${tinyColor('#fff')
      .setAlpha(0.6)
      .toRgbString()};
    text-shadow: 0 0 1px rgba(255, 255, 255, 0.3);
    font-weight: ${BODY_WEIGHTS.medium};
  }

  h4 {
    text-transform: uppercase;
  }
`;

export default GalleryCopy;
