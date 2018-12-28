import { GUTTER_SIZE, TOTAL_GRID_UNITS } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import composeImagesWithMetaData from './images';

export const cleanPropsForReact = props => {
  if (!props) {
    return {};
  }
  return Object.keys(props).reduce((acc, key) => {
    if (props[key] !== null && props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
};

export const mergeContentWithImages = (content, images) =>
  content.edges.reduce((acc, { node: { frontmatter, html } }) => {
    const props = cleanPropsForReact(frontmatter.props);

    const result = {
      location: frontmatter.location,
      author: frontmatter.author,
      testimonial: html,
      images: [],
      ...props,
    };

    result.images = composeImagesWithMetaData(images.edges, frontmatter.images);

    acc.push(result);
    return acc;
  }, []);

export const applyLeftMargin = (elmGridPosition = '') =>
  parseInt(elmGridPosition, 10) === 1 ? pxToRem(GUTTER_SIZE) : 0;

export const applyRightMargin = (elmGridPosition = '') => {
  const gridPositions = elmGridPosition.split('/');
  if (!gridPositions.length === 2) {
    return 0;
  }
  const endPosition = parseInt(gridPositions[1], 10);
  return endPosition === -1 || endPosition === TOTAL_GRID_UNITS + 1 ? pxToRem(GUTTER_SIZE) : 0;
};
