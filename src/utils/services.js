const mergeServiceWithImages = (service = {}, imageEdges = []) => {
  const { frontmatter: { title, images: imageMeta } = {}, html: content = '' } = service;

  const imageMap = imageEdges.reduce((acc, { node }) => {
    const index = imageMeta.findIndex(meta => node.id.includes(meta.image));
    if (index > -1) {
      acc[index] = {
        ...node,
        alt: imageMeta[index].alt,
      };
    }
    return acc;
  }, {});

  return {
    title,
    content,
    // sorts the imges by key
    images: Object.keys(imageMap)
      .sort()
      .reduce((acc, key) => {
        acc.push(imageMap[key]);
        return acc;
      }, []),
  };
};

export default mergeServiceWithImages;
