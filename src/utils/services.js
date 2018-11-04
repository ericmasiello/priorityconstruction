const mergeServiceWithImages = (service = {}, imageEdges = []) => {
  const { frontmatter: { title, images: imageMeta } = {}, html: content = '' } = service;

  const images = imageEdges.reduce((acc, { node }) => {
    const match = imageMeta.find(meta => node.id.includes(meta.image));

    if (match) {
      acc.push({
        ...node,
        alt: match.alt,
      });
    }
    return acc;
  }, []);

  return {
    title,
    content,
    images,
  };
};

export default mergeServiceWithImages;
