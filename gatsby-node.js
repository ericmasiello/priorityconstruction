const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'pages',
    });

    /*
    * Creates a unique slug for each MarkdownRemark node
    * and attaches it as a queryable property from GraphQL.
    * Note: this has nothing to do with create a unique url end point
    * This simply attaches meta data to each node under the "fields"
    * object that you can query within GraphQL.
    * 
    * node {
    *   frontmatter {
    *     name
    *   }
    *   html
    *   fields {
    *     slug
    *   }
    * }
    */
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise(resolve => {
    graphql(`
      {
        gallery: allMarkdownRemark(filter: { id: { regex: "/content/gallery/" } }) {
          edges {
            node {
              frontmatter {
                imageDir
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.gallery.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/GalleryPage.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
            imageDir: node.frontmatter.imageDir,
          },
        });
      });
      resolve();
    });
  });
};
