import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from './GatsbyImage';
import Blockquote from './Blockquote';
import Quote from './Quote';
import Citation from './Citation';
import * as CustomPropTypes from '../propTypes';

export const MediaQuote = props => {
  const { tag: Tag, author, testimonial, location, images, ...rest } = props;
  const quote = testimonial ? (
    <Blockquote>
      <Quote dangerouslySetInnerHTML={{ __html: testimonial }} />
      <Citation>
        <p>{author}</p>
        {location && <p>{location}</p>}
      </Citation>
    </Blockquote>
  ) : null;

  return (
    <Tag {...rest}>
      {quote}
      {images.map(image => (
        <GatsbyImage sizes={image.sizes} alt={image.alt} key={image.id} />
      ))}
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

export default styled(MediaQuote)``;
