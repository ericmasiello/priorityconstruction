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

const groupImages = images => {
  const groups = images.reduce((acc, imageNode) => {
    const match = imageNode.node.id.match(/\/(group[0-9]+)\//gm);
    if (!match) {
      return acc;
    }
    const groupName = match[0].replace(/\//gm, '');
    if (!groupName) {
      return acc;
    }
    if (!acc.has(groupName)) {
      const content = {
        images: [],
        title: '',
        author: '',
        message: '',
      };
      acc.set(groupName, content);
    }
    acc.get(groupName).images.push(imageNode.node);
    return acc;
  }, new Map());
  return groups;
};

const groupTestimonials = images => {
  const groups = images.reduce((acc, testimonialNode) => {
    const { photogroup: groupName, author, title } = testimonialNode.node.frontmatter;
    const message = testimonialNode.node.html;

    if (!groupName) {
      return acc;
    }

    acc.set(groupName, {
      images: [],
      title,
      author,
      message,
    });

    return acc;
  }, new Map());
  return groups;
};

export const groupTestimonialsWithImages = (imageEdges, testimonialEdges) => {
  const groupedImages = groupImages(imageEdges);
  const groupedTestimonials = groupTestimonials(testimonialEdges);
  const [sup, sub] =
    groupedImages.size >= groupedTestimonials.size
      ? [groupedImages, groupedTestimonials]
      : [groupedTestimonials, groupedImages];

  let merged = Array.from(sup).reduce((acc, [key, value]) => {
    if (sub.has(key)) {
      acc.set(key, {
        ...value,
        ...sub.get(key),
        images: [...value.images, ...sub.get(key).images],
      });
    } else {
      acc.set(key, value);
    }
    return acc;
  }, new Map());

  // add any missing keys from sub
  merged = Array.from(sub).reduce((acc, [key, value]) => {
    if (!acc.has(key)) {
      acc.set(key, value);
    }
    return acc;
  }, merged);

  // sort the items by key
  return new Map(Array.from(merged).sort());
};
