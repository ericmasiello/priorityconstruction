import PropTypes from 'prop-types';

export const ImageSharp = PropTypes.shape({
  id: PropTypes.string,
  sizes: PropTypes.shape({
    aspectRatio: PropTypes.number,
    base64: PropTypes.string,
    sizes: PropTypes.string,
    src: PropTypes.string,
    srcSet: PropTypes.string,
  }),
});

export const AllImageSharp = PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: ImageSharp,
    }),
  ),
});

export const Markdown = PropTypes.shape({
  html: PropTypes.string.isRequired,
});

export const GalleryMeta = PropTypes.shape({
  frontmatter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    coverPhoto: PropTypes.string.isRequired,
  }),
  html: PropTypes.string.isRequired,
});

export const AllGalleryMeta = PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: GalleryMeta,
    }),
  ),
});

export const Testimonial = PropTypes.shape({
  frontmatter: PropTypes.shape({
    author: PropTypes.string.isRequired,
    date: PropTypes.string,
    title: PropTypes.string,
  }),
  html: PropTypes.string.isRequired,
});

export const AllTestimonials = PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: Testimonial,
    }),
  ),
});

export const Tag = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

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
