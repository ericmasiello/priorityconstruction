const mergeContentWithImages = (content, images) =>
  content.edges.reduce((acc, { node: { frontmatter, html } }) => {
    const result = {
      location: frontmatter.location,
      author: frontmatter.author,
      testimonial: html,
      images: [],
    };

    result.images = frontmatter.images.reduce((imageAcc, imageMeta) => {
      const match = images.edges.find(({ node: { id } }) => id.includes(imageMeta.image));
      if (match) {
        imageAcc.push({
          ...match.node,
          alt: imageMeta.alt,
        });
      }
      return imageAcc;
    }, []);

    acc.push(result);
    return acc;
  }, []);

export default mergeContentWithImages;
