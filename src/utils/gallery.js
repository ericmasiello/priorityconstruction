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
