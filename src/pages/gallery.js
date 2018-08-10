import React from 'react';
import PropTypes from 'prop-types';
import PageContainer from '../components/PageContainer';
import List from '../components/List';
import GatsbyImage from '../components/GatsbyImage';
import * as CustomPropTypes from '../propTypes';

const LandingGallery = List.extend`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 0.5rem;
`;

LandingGallery.Item = List.Item.extend`
  &:not(:last-child) {
    margin-bottom: 0;
  }
`;

// TODO: maybe move this to markdown and use frontmatter to set the different properties
const landingPageConfig = {
  'anthem-house': {
    title: 'Anthem House',
    location: 'Baltimore, MD',
    description: 'foo bar baz',
  },
  'college-park': {
    title: 'College Park',
    location: 'College Park, MD',
    description: 'yip zip dip',
  },
  'coppin-state': {
    title: 'Coppin State',
    location: 'Baltimore, MD',
    description: 'yip zip dip',
  },
  'fells-point': {
    title: 'Fells Point',
    location: 'Baltimore, MD',
    description: 'yip zip dip',
  },
  georgetown: {
    title: 'Georgetown Waterfront',
    location: 'Washington, DC',
    description: 'yip zip dip',
  },
  umbc: {
    title: 'University of Maryland, Batlimore County',
    location: 'Catonsville, MD',
    description: 'Go retrievers!',
  },
};

const composeGalleryConfig = (edges, config) => {
  const gallery = edges.reduce((acc, edge) => {
    // find the matching config key
    const matchingKey = Object.keys(config).find(key => !!edge.node.id.match(key));
    if (matchingKey) {
      acc[matchingKey] = Object.assign({}, config[matchingKey], edge.node);
    }
    return acc;
  }, {});

  return gallery;
};

const GalleryPage = ({ data }) => {
  const landingGallery =
    data.gallery && composeGalleryConfig(data.gallery.edges, landingPageConfig);
  return (
    <PageContainer tag="section">
      {/* TODO: move to markdown */}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum lacus quis magna
        bibendum mattis. Phasellus sodales efficitur leo, et semper nibh malesuada venenatis. Nullam
        porttitor ultricies tellus a dignissim. Integer eget convallis erat. Sed ut nisl viverra,
        blandit elit et, lacinia odio. Cras pulvinar a mi vel pretium.
      </p>
      <LandingGallery>
        {landingGallery &&
          Object.keys(landingGallery).map(key => (
            <LandingGallery.Item key={landingGallery[key].id}>
              <GatsbyImage sizes={landingGallery[key].sizes} />
              <p>{landingGallery[key].title}</p>
              <p>{landingGallery[key].location}</p>
              <p>{landingGallery[key].description}</p>
            </LandingGallery.Item>
          ))}
      </LandingGallery>
    </PageContainer>
  );
};

GalleryPage.displayName = 'GalleryPage';

GalleryPage.propTypes = {
  data: PropTypes.shape({
    gallery: CustomPropTypes.AllImageSharp,
  }).isRequired,
};

export default GalleryPage;

export const query = graphql`
  query GalleryMeta {
    gallery: allImageSharp(
      limit: 20
      filter: { id: { regex: "/src/images/photos/gallery/\\S+/index/" } }
    ) {
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
