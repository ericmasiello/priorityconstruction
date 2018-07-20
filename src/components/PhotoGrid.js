import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import List from './List';
import GatsbyImage from './GatsbyImage';
import * as CustomPropTypes from '../propTypes';
import { pxToRem } from '../styles/utils';

const breakpoint = pxToRem(800);

const PrimaryPhotoGrid = styled(List.Item)`
  @media (min-width: ${breakpoint}) {
    grid-column: span 2;
    grid-row: span 2;
  }
`;

const PhotoGrid = props => {
  const { primaryImage, additionalImages, ...rest } = props;
  return (
    <List {...rest}>
      <PrimaryPhotoGrid>
        <GatsbyImage sizes={primaryImage.sizes} />
      </PrimaryPhotoGrid>
      {additionalImages.map(image => (
        <List.Item key={image.id}>
          <GatsbyImage sizes={image.sizes} />
        </List.Item>
      ))}
    </List>
  );
};

PhotoGrid.propTypes = {
  additionalImages: PropTypes.arrayOf(CustomPropTypes.ImageSharp),
  primaryImage: CustomPropTypes.ImageSharp.isRequired,
};

PhotoGrid.displayName = 'PhotoGrid';

export default styled(PhotoGrid)`
  display: grid;
  grid-gap: 1rem;

  @media(min-width: ${breakpoint}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, ${pxToRem(200)});
  }

  ${List.Item} {
    margin: 0;
  }

  ${List.Item} .gatsby-image-outer-wrapper,
  ${GatsbyImage} {
    height: 100%;
  }
`;
