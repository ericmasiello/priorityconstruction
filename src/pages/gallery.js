import React from 'react';
import PropTypes from 'prop-types';
import PageContainer from '../components/PageContainer';
import List from '../components/List';
import GatsbyImage from '../components/GatsbyImage';
import * as CustomPropTypes from '../propTypes';
import { composeGalleryLandingMedia } from '../utils/gallery';

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

const GalleryPage = ({ data }) => {
  if (!data.gallery || !data.galleryMeta) {
    return null;
  }

  const landingGallery = composeGalleryLandingMedia(data.gallery.edges, data.galleryMeta.edges);
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
        {landingGallery.map(media => (
          <LandingGallery.Item key={media.imageId}>
            <GatsbyImage sizes={media.sizes} />
            <p>{media.name}</p>
            <p>{media.location}</p>
            <div dangerouslySetInnerHTML={{ __html: media.description }} />
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
    galleryMeta: CustomPropTypes.AllGalleryMeta,
  }).isRequired,
};

export default GalleryPage;

export const query = graphql`
  query GalleryMeta {
    galleryMeta: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___name] }
      limit: 20
      filter: { id: { regex: "/content/gallery/" } }
    ) {
      edges {
        node {
          frontmatter {
            name
            location
            coverPhoto
          }
          html
        }
      }
    }
    gallery: allImageSharp(limit: 100, filter: { id: { regex: "/src/images/photos/gallery/" } }) {
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
