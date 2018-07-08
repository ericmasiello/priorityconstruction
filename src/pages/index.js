import React from 'react';
import PropTypes from 'prop-types';
import { AllImageSharpPropTypes } from '../propTypes';
import GatsbyImage from '../components/GatsbyImage';
import List from '../components/List';

const HomePage = ({ data }) => (
  <div>
    <p>
      Priority Construction Corp., is dedicated to complete different types
      of concrete projects throughout the Baltimore area by using highly
      skilled employees and paying attention to every detail of the project.
    </p>
    <List>
      {data.homageGallery.edges.map(edge => (
        <GatsbyImage
          key={edge.node.id}
          sizes={edge.node.sizes}
        />
      ))}
    </List>
  </div>
);

HomePage.displayName = 'HomePage';

HomePage.propTypes = {
  data: PropTypes.shape({
    homageGallery: AllImageSharpPropTypes,
  }).isRequired,
};

export default HomePage;

export const query = graphql`
  query HomePage {
    homageGallery: allImageSharp(limit: 20, filter:{
      id: {
        regex: "/src/images/photos/homepage-gallery/"
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
