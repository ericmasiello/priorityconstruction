import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';
import GatsbyImage from './GatsbyImage';
import Blockquote from './Blockquote';
import Citation from './Citation';
import * as CustomPropTypes from '../propTypes';
import { MAX_CONTENT_WIDTH, COLORS, GUTTER_SIZE } from '../styles/vars';
import { pxToRem } from '../styles/utils';

const SINGLE_ROW_BREAKPOINT = 850;

const MEDIUM_SIZE_PADDING = `calc(((1 / 12) * 100vw) - ${pxToRem(GUTTER_SIZE)})`;
const FULL_SIZE_PADDING = `calc(${pxToRem(MAX_CONTENT_WIDTH * (1 / 12))} - ${pxToRem(
  GUTTER_SIZE,
)})`;

export const MediaQuote = props => {
  const {
    tag: Tag,
    author,
    testimonial,
    location,
    images,
    grayed,
    padQuoteEvenly,
    imageGridSize,
    quoteGridSize,
    ...rest
  } = props;
  const quote = testimonial ? (
    <Blockquote quoteColor={grayed ? COLORS.gray : undefined}>
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
  grayed: PropTypes.bool,
  padQuoteEvenly: PropTypes.bool,
  imageGridSize: PropTypes.string,
  quoteGridSize: PropTypes.string,
};

MediaQuote.defaultProps = {
  tag: 'div',
  images: [],
};

const StyledMediaQuote = styled(MediaQuote)`
  display: grid;

  ${Blockquote} {
    grid-row: 2;
    background-color: ${({ grayed }) =>
      grayed
        ? tinyColor(COLORS.gray)
            .setAlpha(0.2)
            .toRgbString()
        : 'transparent'};
  }

  .gatsby-image-outer-wrapper {
    grid-row: 1;
  }

  @media (min-width: ${pxToRem(SINGLE_ROW_BREAKPOINT)}) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1;
    grid-gap: ${pxToRem(GUTTER_SIZE)};

    ${Blockquote}, .gatsby-image-outer-wrapper {
      grid-row: 1;
    }

    ${Blockquote} {
      grid-column: ${({ quoteGridSize }) => quoteGridSize};
      padding-left: ${MEDIUM_SIZE_PADDING};
      ${({ padQuoteEvenly }) => padQuoteEvenly && `padding-right: ${MEDIUM_SIZE_PADDING}`};
    }

    .gatsby-image-outer-wrapper {
      grid-column: ${({ imageGridSize }) => imageGridSize};
    }
  }

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  @media (min-width: ${pxToRem(MAX_CONTENT_WIDTH)}) {
    ${Blockquote} {
      padding-left: ${FULL_SIZE_PADDING};
      ${({ padQuoteEvenly }) => padQuoteEvenly && `padding-right: ${FULL_SIZE_PADDING}`};
    }
  }
`;

StyledMediaQuote.propTypes = {
  imageGridSize: PropTypes.string,
  quoteGridSize: PropTypes.string,
};

StyledMediaQuote.defaultProps = {
  imageGridSize: '1 / 7',
  quoteGridSize: '7 / -1',
};

export default StyledMediaQuote;
