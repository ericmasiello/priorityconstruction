import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import List from './List';
import GatsbyImage from './GatsbyImage';
import * as CustomPropTypes from '../propTypes';

const PrimaryPhotoGrid = styled(List.Item)`
  grid-column: span 2;
  grid-row: span 2;
`;

const PhotoGrid = (props) => {
  const { primaryImage, additionalImages, ...rest } = props;
  return (
    <List {...rest}>
      <PrimaryPhotoGrid>
        <GatsbyImage
          sizes={primaryImage.sizes}
        />
      </PrimaryPhotoGrid>
      {additionalImages.map((image) => (
        <List.Item key={image.id}>
          <GatsbyImage
            sizes={image.sizes}
          />
        </List.Item>
      ))}
    </List>
  );
};

PhotoGrid.propTypes = {
  additionalImages: PropTypes.arrayOf(CustomPropTypes.ImageSharpPropTypes),
  primaryImage: CustomPropTypes.ImageSharpPropTypes.isRequired,
};

PhotoGrid.displayName = 'PhotoGrid';

export default styled(PhotoGrid)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`;
