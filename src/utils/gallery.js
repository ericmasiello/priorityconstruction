const predicate = primaryMatch => include => edge => {
  if (edge.node.id.includes(primaryMatch)) {
    return include;
  }
  return !include;
};

export const mapEdgeToNode = edge => edge.node;

export const edgesToGallery = (edges, primaryMatch = '') => {
  const predicateMatch = predicate(primaryMatch);
  const primary = edges.find(predicateMatch(true));

  if (primary) {
    return {
      primaryImage: mapEdgeToNode(primary),
      additionalImages: edges.filter(predicateMatch(false)).map(mapEdgeToNode),
    };
  }

  return {
    primaryImage: null,
    additionalImages: edges.map(mapEdgeToNode),
  };
};

export const composeGalleryLandingMedia = (images, contentMeta) =>
  images.reduce((acc, image) => {
    // check to see if each image exists in the contentMeta...
    const matchContent = contentMeta.find(
      meta => !!image.node.id.match(meta.node.frontmatter.coverPhoto),
    );
    if (!matchContent) {
      return acc;
    }
    const media = Object.assign({
      id: matchContent.node.id,
      href: matchContent.node.fields.slug,
      location: matchContent.node.frontmatter.location,
      name: matchContent.node.frontmatter.name,
      description: matchContent.node.html,
      imageId: image.node.id,
      sizes: image.node.sizes,
    });
    acc.push(media);
    return acc;
  }, []);
