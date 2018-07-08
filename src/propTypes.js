import PropTypes from 'prop-types';

export const ImageSharpPropTypes = PropTypes.shape({
  id: PropTypes.string,
  sizes: PropTypes.shape({
    aspectRatio: PropTypes.number,
    base64: PropTypes.string,
    sizes: PropTypes.string,
    src: PropTypes.string,
    srcSet: PropTypes.string,
  }),
});

export const AllImageSharpPropTypes = PropTypes.shape({
  edges: PropTypes.arrayOf(PropTypes.shape({
    node: ImageSharpPropTypes,
  })),
});

export const TagPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);
