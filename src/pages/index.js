import React from 'react';
import PropTypes from 'prop-types';
import PostListing from '../components/Posts/PostListing';
import Type1 from '../components/Type1';
import Type2 from '../components/Type2';
import Type3 from '../components/Type3';
import Type4 from '../components/Type4';
import Type5 from '../components/Type5';
import Small from '../components/Small';
import Base from '../components/Base';


const IndexPage = ({ data }) => (
  <div>
    <Type1>Posts</Type1>
    <Type2>Posts</Type2>
    <Type3>Posts</Type3>
    <Type4>Posts</Type4>
    <Type5>Posts</Type5>
    <Base>Posts</Base>
    <Small>Posts</Small>
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
