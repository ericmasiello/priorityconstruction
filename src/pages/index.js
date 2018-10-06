import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';
import * as CustomPropTypes from '../propTypes';
import Container from '../components/Container';
import PhotoGrid from '../components/PhotoGrid';
import TestimonialCarousel from '../components/TestimonialCarousel';
import Type4 from '../components/Type4';
import FlatList from '../components/FlatList';
import FlatListItem from '../components/FlatListItem';
import { groupTestimonialsWithImages } from '../utils/gallery';
import { COLORS, GUTTER_SIZE } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import markdownRemarkToTestimonial from '../utils/testimonials';

const Services = styled(FlatList)`
  flex-wrap: wrap;
`;

const ServiceItem = styled(FlatListItem)`
  &:not(:last-child)::after {
    content: '·';
    display: inline-block;
    padding-left: 0.5rem;
  }
`;

const Callout = styled.hgroup`
  background-color: ${tinyColor(COLORS.gray)
    .setAlpha(0.2)
    .toRgbString()};
  padding: ${pxToRem(GUTTER_SIZE)};
  grid-column: 1 / 9;
  text-transform: uppercase;
`;

const HomePage = props => {
  const {
    data: { photos, testimonials },
    className,
  } = props;
  const testimonialGroups = groupTestimonialsWithImages(photos.edges, testimonials.edges);
  console.log(testimonialGroups);

  return (
    <React.Fragment>
      <Container tag="section" plus className={className}>
        <Callout>
          <Type4 tag="h2">
            Safety is our 
            {' '}
            <strong>number one</strong>
            {' '}
priority
          </Type4>
          <Services>
            <ServiceItem>Brick Paving</ServiceItem>
            <ServiceItem>Flatwork Concrete</ServiceItem>
            <ServiceItem>Pervious Concrete</ServiceItem>
            <ServiceItem>Stamped &amp; Colored Concrete</ServiceItem>
            <ServiceItem>Structural Concrete &amp; Steps</ServiceItem>
          </Services>
        </Callout>
      </Container>
      <TestimonialCarousel testimonials={testimonials.edges.map(markdownRemarkToTestimonial)} />
    </React.Fragment>
  );
};

HomePage.displayName = 'HomePage';

HomePage.propTypes = {
  data: PropTypes.shape({
    photos: CustomPropTypes.AllImageSharp,
    testimonials: CustomPropTypes.AllTestimonials,
  }).isRequired,
  className: PropTypes.string,
};

export default styled(HomePage)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding-bottom: ${pxToRem(70)};
`;

export const query = graphql`
  query HomePage {
    photos: allImageSharp(
      filter: { id: { regex: "/src/images/photos/homepage-gallery/" } }
      sort: { order: ASC, fields: [id] }
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
      sort: { order: DESC, fields: [frontmatter___photogroup, id] }
      limit: 10
      filter: { id: { regex: "/content/testimonials/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            photogroup
            author
          }
          html
        }
      }
    }
  }
`;
