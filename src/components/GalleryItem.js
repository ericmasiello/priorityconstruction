import React from 'react';
import styled from 'styled-components';
import GalleryCopy from './GalleryCopy';
import * as CustomPropTypes from '../propTypes';

const GalleryItem = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

GalleryItem.displayName = 'GalleryItem';

GalleryItem.propTypes = {
  tag: CustomPropTypes.Tag,
};

GalleryItem.defaultProps = {
  tag: 'div',
};

export default styled(GalleryItem)`
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
    ${GalleryCopy} {
      transform: translateY(0);
    }
  }
`;
