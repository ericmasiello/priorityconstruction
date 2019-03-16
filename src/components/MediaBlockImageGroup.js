import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from './GatsbyImage';

export const MediaBlockImageGroup = ({ size, ...rest }) => <div {...rest} />;

MediaBlockImageGroup.propTypes = {
  size: PropTypes.number,
};

export default styled(MediaBlockImageGroup)`
  ${GatsbyImage} {
    height: 100%;
  }

  ${({ size = 0 }) => {
    if (size < 2) {
      return '';
    }

    const styles = [
      `display: grid;
      grid-gap: 0.5rem;
      position: relative;
      grid-template-rows: repeat(${Math.round(size / 2)}, 1fr);
      grid-template-columns: repeat(2, 1fr);`,
    ];

    /*
      If there's an odd number of images,
      style the last one to fill the entire
      last row
    */
    if (size % 2 === 1) {
      styles.push(`
        > :last-child {
          grid-row: ${Math.round(size / 2)};
          position: absolute !important;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
        }
      `);
    }

    return styles.join('');
  }};
`;
