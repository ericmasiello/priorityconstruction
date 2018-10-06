import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';
import * as CustomPropTypes from '../propTypes';
import Container from '../components/Container';
import MediaQuoate from '../components/MediaQuote';
import Type4 from '../components/Type4';
import FlatList from '../components/FlatList';
import FlatListItem from '../components/FlatListItem';
import { COLORS, GUTTER_SIZE } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import mergeContentWithImages from '../utils/homepage';

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
    data: { content, photos },
    className,
  } = props;
  const contentBlocks = mergeContentWithImages(content, photos);
  console.log(contentBlocks);

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
        {contentBlocks.map(block => (
          <MediaQuoate key={block.author || block.images[0].id} {...block} />
        ))}
      </Container>
    </React.Fragment>
  );
};

HomePage.displayName = 'HomePage';

HomePage.propTypes = {
  data: PropTypes.shape({
    photos: CustomPropTypes.AllImageSharp,
    content: CustomPropTypes.AllHomepageContent,
  }).isRequired,
  className: PropTypes.string,
};

export default styled(HomePage)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding-bottom: ${pxToRem(70)};

  ${MediaQuoate} {
    grid-column: 1 / -1;
  }
`;

export const query = graphql`
  query HomePage {
    photos: allImageSharp(
      filter: { id: { regex: "/src/images/photos/homepage/" } }
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

    content: allMarkdownRemark(
      sort: { order: ASC, fields: [id] }
      limit: 10
      filter: { id: { regex: "/content/homepage/" } }
    ) {
      edges {
        node {
          frontmatter {
            location
            author
            images {
              image
              alt
            }
          }
          html
        }
      }
    }
  }
`;
