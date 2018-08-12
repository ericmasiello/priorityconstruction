import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link';
import tinyColor from 'tinycolor2';
import PageContainer from '../components/PageContainer';
import List from '../components/List';
import GatsbyImage from '../components/GatsbyImage';
import * as CustomPropTypes from '../propTypes';
import { composeGalleryLandingMedia } from '../utils/gallery';
import { BODY_WEIGHTS } from '../styles/vars';

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

const GalleryItemContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s ease-in;
  transform: translateY(100%);

  p,
  h4 {
    margin-bottom: 0;
    padding-left: 0.25rem;
    padding-right: 0.25rem;

    background-color: ${tinyColor('#fff')
      .setAlpha(0.6)
      .toRgbString()};
    text-shadow: 0 0 1px rgba(255, 255, 255, 0.3);
    font-weight: ${BODY_WEIGHTS.medium};
  }

  h4 {
    text-transform: uppercase;
  }
`;

const GalleryItem = styled(Link)`
  position: relative;
  display: flex;
  height: 100%;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 0;
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
    width: 100%;
  }

  &:hover,
  &:focus {
    ${GalleryItemContent} {
      transform: translateY(0);
    }
  }
`;

const GalleryImage = GatsbyImage.extend`
  height: 100%;
  z-index: 1;
  transition: transform 3s;

  &:hover {
    transform: scale(1.15);
  }
`;

const GalleryPage = ({ className, data }) => {
  if (!data.gallery || !data.galleryMeta) {
    return null;
  }

  const landingGallery = composeGalleryLandingMedia(data.gallery.edges, data.galleryMeta.edges);
  return (
    <PageContainer tag="section" className={className}>
      {/* TODO: move to markdown */}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum lacus quis magna
        bibendum mattis. Phasellus sodales efficitur leo, et semper nibh malesuada venenatis. Nullam
        porttitor ultricies tellus a dignissim. Integer eget convallis erat. Sed ut nisl viverra,
        blandit elit et, lacinia odio. Cras pulvinar a mi vel pretium.
      </p>
      <LandingGallery>
        {landingGallery.map(media => (
          <LandingGallery.Item key={media.id}>
            <GalleryItem to={media.href}>
              <GalleryImage sizes={media.sizes} />
              <GalleryItemContent>
                <h4>{media.name}</h4>
                <p>{media.location}</p>
                <div dangerouslySetInnerHTML={{ __html: media.description }} />
              </GalleryItemContent>
            </GalleryItem>
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
  className: PropTypes.string,
};

export default styled(GalleryPage)`
  padding-top: 1rem;
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
