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

export const Location = PropTypes.shape({
  hash: PropTypes.string.isRequired,
  key: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
});

export const History = PropTypes.shape({
  action: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goForward: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  listen: PropTypes.func.isRequired,
  location: Location.isRequired,
  push: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
});

export const LayoutContext = PropTypes.shape({});

export const Match = PropTypes.shape({
  isExact: PropTypes.bool,
  params: PropTypes.shape({}),
  path: PropTypes.string,
  url: PropTypes.string,
});
