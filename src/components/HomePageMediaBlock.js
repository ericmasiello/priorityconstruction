import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ZoomImage from './ZoomImage';
import MediaBlockImageGroup from './MediaBlockImageGroup';
import Blockquote from './Blockquote';
import MarkdownBlock from './MarkdownBlock';
import Citation from './Citation';
import * as CustomPropTypes from '../propTypes';
import { MAX_CONTENT_WIDTH_PLUS, COLORS, GUTTER_SIZE, TOTAL_GRID_UNITS } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import { take } from '../utils/arrayUtil';

const SINGLE_ROW_BREAKPOINT = 850;

const MEDIUM_SIZE_PADDING = `calc(((1 / ${TOTAL_GRID_UNITS}) * 100vw) - ${pxToRem(GUTTER_SIZE)})`;
const FULL_SIZE_PADDING = `calc(${pxToRem(
  MAX_CONTENT_WIDTH_PLUS * (1 / TOTAL_GRID_UNITS),
)} - ${pxToRem(GUTTER_SIZE)})`;

const take3 = take(3);

export const HomePageMediaBlock = props => {
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
    applyLeftMargin,
    applyRightMargin,
    ...rest
  } = props;
  const quote = testimonial ? (
    <Blockquote quoteColor={grayed ? COLORS.gray[0] : undefined}>
      <MarkdownBlock dangerouslySetInnerHTML={{ __html: testimonial }} />
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

  const renderImages = take3(images);

  return (
    <Tag {...rest}>
      {quote}
      <MediaBlockImageGroup size={renderImages.length}>
        {renderImages.map(img => (
          <ZoomImage key={img.id} sizes={img.sizes} alt={img.alt} />
        ))}
      </MediaBlockImageGroup>
    </Tag>
  );
};

HomePageMediaBlock.propTypes = {
  tag: CustomPropTypes.Tag,
  author: PropTypes.string,
  testimonial: PropTypes.string,
  location: PropTypes.string,
  images: PropTypes.arrayOf(CustomPropTypes.ImageSharp),
  grayed: PropTypes.bool,
  padQuoteEvenly: PropTypes.bool,
  imageGridSize: PropTypes.string,
  quoteGridSize: PropTypes.string,
  applyLeftMargin: PropTypes.func,
  applyRightMargin: PropTypes.func,
};

HomePageMediaBlock.defaultProps = {
  tag: 'article',
  images: [],
  imageGridSize: '1 / 7',
  quoteGridSize: '7 / -1',
  applyLeftMargin: () => 0,
  applyRightMargin: () => 0,
};

const StyledHomePageMediaBlock = styled(HomePageMediaBlock)`
  ${
    /*
    When there is no testimonial, render element as a block.
    This works around a Moblie Safari issue.
    */ ''
  }
  display: ${({ testimonial }) => (testimonial ? 'grid' : 'block')};

  ${Blockquote} {
    grid-row: 2;
    background-color: ${({ grayed }) => (grayed ? COLORS.gray[1] : 'transparent')};
  }

  ${MediaBlockImageGroup} {
    grid-row: 1;
  }

  ${ZoomImage} .gatsby-image-outer-wrapper,
  ${ZoomImage} .gatsby-image-outer-wrapper > div {
    height: 100%;
  }

  @media (min-width: ${pxToRem(SINGLE_ROW_BREAKPOINT)}) {
    display: grid;
    grid-template-columns: repeat(${TOTAL_GRID_UNITS}, 1fr);
    grid-gap: ${pxToRem(GUTTER_SIZE)};

    ${Blockquote}, ${MediaBlockImageGroup} {
      grid-row: 1;
    }

    ${Blockquote} {
      grid-column: ${({ quoteGridSize }) => quoteGridSize};
      padding-left: ${MEDIUM_SIZE_PADDING};
      ${({ padQuoteEvenly }) => padQuoteEvenly && `padding-right: ${MEDIUM_SIZE_PADDING}`};
      margin-left: ${({ applyLeftMargin, quoteGridSize }) => applyLeftMargin(quoteGridSize)};
      margin-right: ${({ applyRightMargin, quoteGridSize }) => applyRightMargin(quoteGridSize)};
    }

    ${MediaBlockImageGroup} {
      grid-column: ${({ imageGridSize }) => imageGridSize};
      margin-left: ${({ applyLeftMargin, imageGridSize }) => applyLeftMargin(imageGridSize)};
      margin-right: ${({ applyRightMargin, imageGridSize }) => applyRightMargin(imageGridSize)};
    }
  }

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  @media (min-width: ${pxToRem(MAX_CONTENT_WIDTH_PLUS)}) {
    ${Blockquote} {
      padding-left: ${FULL_SIZE_PADDING};
      ${({ padQuoteEvenly }) => padQuoteEvenly && `padding-right: ${FULL_SIZE_PADDING}`};
    }
  }
`;

StyledHomePageMediaBlock.propTypes = {
  imageGridSize: PropTypes.string,
  quoteGridSize: PropTypes.string,
  applyLeftMargin: PropTypes.func,
  applyRightMargin: PropTypes.func,
};

StyledHomePageMediaBlock.defaultProps = HomePageMediaBlock.defaultProps;

export default StyledHomePageMediaBlock;
