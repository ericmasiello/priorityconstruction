import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from './GatsbyImage';
import Blockquote from './Blockquote';
import Citation from './Citation';
import * as CustomPropTypes from '../propTypes';
import { MAX_CONTENT_WIDTH_PLUS } from '../styles/vars';
import { pxToRem } from '../styles/utils';

export const MediaQuote = props => {
  const { tag: Tag, author, testimonial, location, images, ...rest } = props;
  const quote = testimonial ? (
    <Blockquote>
      <div dangerouslySetInnerHTML={{ __html: testimonial }} />
      <Citation>
        {author}
        {location && (
          <React.Fragment>
            <br />
            {location}
          </React.Fragment>
        )}
      </Citation>
    </Blockquote>
  ) : null;

  // TODO: update to map over images
  const image = images[0] ? <GatsbyImage sizes={images[0].sizes} alt={images[0].alt} /> : null;

  return (
    <Tag {...rest}>
      {quote}
      {image}
    </Tag>
  );
};

MediaQuote.propTypes = {
  tag: CustomPropTypes.Tag,
  author: PropTypes.string,
  testimonial: PropTypes.string,
  location: PropTypes.string,
  images: PropTypes.arrayOf(CustomPropTypes.ImageSharp),
};

MediaQuote.defaultProps = {
  tag: 'div',
  images: [],
};

export default styled(MediaQuote)`
  display: grid;

  ${Blockquote} {
    grid-row: 2;
  }

  .gatsby-image-outer-wrapper {
    grid-row: 1;
  }

  @media (min-width: ${pxToRem(850)}) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1;

    ${Blockquote}, .gatsby-image-outer-wrapper {
      grid-row: 1;
    }

    ${Blockquote} {
      grid-column: 7 / -1;
      padding-left: calc((1 / 12) * 100vw);
    }

    .gatsby-image-outer-wrapper {
      grid-column: 1 / 7;
    }
  }

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  @media (min-width: ${pxToRem(MAX_CONTENT_WIDTH_PLUS)}) {
    ${Blockquote} {
      padding-left: ${pxToRem(MAX_CONTENT_WIDTH_PLUS * (1 / 12))};
    }
  }
`;
