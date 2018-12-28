const composeImagesWithMetaData = (imageNodes, imageMeta) =>
  imageMeta.reduce((acc, { image: imagePath, alt }) => {
    const matchImageNode = imageNodes.find(({ node }) => node.id.match(imagePath));
    if (!matchImageNode) {
      return acc;
    }
    acc.push({
      ...matchImageNode.node,
      alt,
    });
    return acc;
  }, []);

export default composeImagesWithMetaData;
