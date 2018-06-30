import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

const GalleryPage = ({ data }) => (
  <div>
    <h2>Gallery</h2>
    <ul>
      {data.gallery.edges.map(edge => (
        <li key={edge.node.id}><Img sizes={edge.node.sizes} /></li>
      ))}
    </ul>
  </div>
);

GalleryPage.displayName = 'GalleryPage';

GalleryPage.propTypes = {
  data: PropTypes.shape({
    gallery: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string.isRequired,
          sizes: PropTypes.shape({}),
        }),
      })),
    }),
  }).isRequired,
};

export default GalleryPage;

export const query = graphql`
  query GalleryMeta {
    gallery: allImageSharp(limit: 20, filter:{
      id: {
        regex: "/src/images/"
      }
    }) {
      edges {
        node {
          id
          sizes {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
  }
`;
