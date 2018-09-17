import React from 'react';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';
import GatsbyImage from './GatsbyImage';
import { BODY_WEIGHTS } from '../styles/vars';
import * as CustomPropTypes from '../propTypes';

const Content = styled.div`
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

const GalleryItem = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

GalleryItem.displayName = 'GalleryItem';

GalleryItem.propTypes = {
  tag: CustomPropTypes.Tag,
};

GalleryItem.defaultProps = {
  tag: 'div',
};

const StyledGalleryItem = styled(GalleryItem)`
  position: relative;
  display: flex;
  height: 100%;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 0;
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
    width: 100%;
  }

  &:hover,
  &:focus {
    ${Content} {
      transform: translateY(0);
    }
  }
`;

const Image = GatsbyImage.extend`
  height: 100%;
  z-index: 1;
  transition: transform 3s;

  &:hover {
    transform: scale(1.15);
  }
`;

StyledGalleryItem.Image = Image;
StyledGalleryItem.Content = Content;

export default StyledGalleryItem;
