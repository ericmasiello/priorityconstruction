import composeImagesWithMetaData from './images';

const mergeServiceWithImages = (service = {}, imageEdges = []) => {
  const { frontmatter: { title, images: imageMeta } = {}, html: content = '' } = service;

  return {
    title,
    content,
    images: composeImagesWithMetaData(imageEdges, imageMeta),
  };
};

export default mergeServiceWithImages;
