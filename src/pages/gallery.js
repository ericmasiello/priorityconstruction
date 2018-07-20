import React from 'react';
import PropTypes from 'prop-types';
import PageContainer from '../components/PageContainer';
import Type2 from '../components/Type2';
import List from '../components/List';
import GatsbyImage from '../components/GatsbyImage';
import * as CustomPropTypes from '../propTypes';

const GalleryPage = ({ data }) => (
  <PageContainer tag="section">
    <Type2 tag="h1">Gallery</Type2>
    <List>
      {data.gallery.edges.map(edge => (
        <List.Item key={edge.node.id}>
          <GatsbyImage sizes={edge.node.sizes} />
        </List.Item>
      ))}
    </List>
  </PageContainer>
);

GalleryPage.displayName = 'GalleryPage';

GalleryPage.propTypes = {
  data: PropTypes.shape({
    gallery: CustomPropTypes.AllImageSharp,
  }).isRequired,
};

export default GalleryPage;

export const query = graphql`
  query GalleryMeta {
    gallery: allImageSharp(limit: 20, filter: { id: { regex: "/src/images/" } }) {
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
