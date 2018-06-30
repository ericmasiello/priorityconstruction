import React from 'react';
import PropTypes from 'prop-types';
import PostListing from '../components/Posts/PostListing';
import Type1 from '../components/Type1';

const IndexPage = ({ data }) => (
  <div>
    <Type1>Posts</Type1>
    {data.allMarkdownRemark.edges.map(({ node }) => <PostListing key={node.id} post={node} />)}
  </div>
);

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
};

export default IndexPage;

export const query = graphql`
  query SiteMeta {
    site {
      siteMetadata {
        title
        desc
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD YYYY")
          }
          fields {
            slug
          }
          html
          excerpt
        }
      }
    }
  }
`;
