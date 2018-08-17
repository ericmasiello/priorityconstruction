import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link';
import PageContainer from '../components/PageContainer';
import Gallery from '../components/Gallery';
import GalleryItem from '../components/GalleryItem';
import * as CustomPropTypes from '../propTypes';
import { composeGalleryLandingMedia } from '../utils/gallery';

const GalleryPage = ({ className, data }) => {
  if (!data.gallery || !data.galleryMeta) {
    return null;
  }

  const landingGallery = composeGalleryLandingMedia(data.gallery.edges, data.galleryMeta.edges);
  return (
    <PageContainer tag="section" className={className}>
      <Gallery>
        {landingGallery.map(media => (
          <Gallery.Item key={media.id}>
            <GalleryItem tag={Link} to={media.href}>
              <GalleryItem.Image sizes={media.sizes} />
              <GalleryItem.Content>
                <h4>{media.name}</h4>
                <p>{media.location}</p>
                <div dangerouslySetInnerHTML={{ __html: media.description }} />
              </GalleryItem.Content>
            </GalleryItem>
          </Gallery.Item>
        ))}
      </Gallery>
    </PageContainer>
  );
};

GalleryPage.displayName = 'GalleryPage';

GalleryPage.propTypes = {
  data: PropTypes.shape({
    gallery: CustomPropTypes.AllImageSharp,
    galleryMeta: CustomPropTypes.AllGalleryMeta,
  }).isRequired,
  className: PropTypes.string,
};

export default styled(GalleryPage)`
  padding-top: 4rem;
`;

export const query = graphql`
  query GalleryMeta {
    galleryMeta: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___name] }
      limit: 20
      filter: { id: { regex: "/gallery/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            location
            coverPhoto
          }
          html
          fields {
            slug
          }
        }
      }
    }
    gallery: allImageSharp(limit: 100, filter: { id: { regex: "/src/gallery/photos/" } }) {
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
