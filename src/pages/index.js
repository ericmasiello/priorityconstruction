import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as CustomPropTypes from '../propTypes';
import PageContainer from '../components/PageContainer';
import PhotoGrid from '../components/PhotoGrid';
import Placeholder from '../components/Placeholder';
import Type4 from '../components/Type4';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { edgesToGallery } from '../utils/gallery';
import { COLORS } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import blueprint from '../images/blueprint.svg';
import markdownRemarkToTestimonial from '../utils/testimonials';

const FPOGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${pxToRem(280)}, 1fr));
  grid-gap: 1rem;
  margin-bottom: ${pxToRem(160)};

  ${Type4} {
    color: ${COLORS.highlight3};
    text-transform: uppercase;
  }

  ${Placeholder} {
    min-height: ${pxToRem(225)};
  }
`;

const MainContentContainer = PageContainer.extend`
  background-image: url(${blueprint});
  background-size: cover;
  background-position: center center;
  position: relative;
  padding-top: ${pxToRem(70)};
  padding-bottom: ${pxToRem(70)};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.75);
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const HomePage = props => {
  const { data } = props;
  const photoGridProps = edgesToGallery(data.homageGallery.edges, 'courtyard.jpg');

  return (
    <React.Fragment>
      <MainContentContainer tag="section">
        <FPOGrid>
          <Placeholder>
            <Type4>Our Team</Type4>
          </Placeholder>
          <Placeholder>
            <Type4>Our Expertise</Type4>
          </Placeholder>
        </FPOGrid>
        <PhotoGrid {...photoGridProps} />
      </MainContentContainer>
      <TestimonialCarousel
        testimonials={data.testimonials.edges.map(markdownRemarkToTestimonial)}
      />
    </React.Fragment>
  );
};

HomePage.displayName = 'HomePage';

HomePage.propTypes = {
  data: PropTypes.shape({
    homageGallery: CustomPropTypes.AllImageSharp,
    testimonials: CustomPropTypes.AllTestimonials,
  }).isRequired,
  className: PropTypes.string,
};

export default HomePage;

export const query = graphql`
  query HomePage {
    homageGallery: allImageSharp(
      limit: 20
      filter: { id: { regex: "/src/images/photos/homepage-gallery/" } }
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

    testimonials: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, id] }
      limit: 10
      filter: { id: { regex: "/content/testimonials/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            author
          }
          html
        }
      }
    }
  }
`;
