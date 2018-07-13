import React from 'react';
import PropTypes from 'prop-types';
import * as CustomPropTypes from '../propTypes';
import PhotoGrid from '../components/PhotoGrid';

// TODO: move these to a utility file
const predicate = (primaryMatch) => (include) => (edge) => {
  if (edge.node.id.includes(primaryMatch)) {
    return include;
  }
  return !include;
};

const mapEdgeToNode = edge => edge.node;

const edgesToGallery = (edges, primaryMatch = '') => {
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

const HomePage = (props) => {
  const { data, className } = props;
  const photoGridProps = edgesToGallery(data.homageGallery.edges, 'courtyard.jpg');

  return (
    <section className={className}>
      <p>
        Priority Construction Corp., is dedicated to complete different types
        of concrete projects throughout the Baltimore area by using highly
        skilled employees and paying attention to every detail of the project.
      </p>
      <PhotoGrid {...photoGridProps} />
    </section>
  );
};

HomePage.displayName = 'HomePage';

HomePage.propTypes = {
  data: PropTypes.shape({
    homageGallery: CustomPropTypes.AllImageSharp,
  }).isRequired,
  className: PropTypes.string,
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
