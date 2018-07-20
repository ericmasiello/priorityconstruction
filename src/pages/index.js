import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as CustomPropTypes from '../propTypes';
import PageContainer from '../components/PageContainer';
import PhotoGrid from '../components/PhotoGrid';
import Placeholder from '../components/Placeholder';
import Type4 from '../components/Type4';
import Base from '../components/Base';
import Blockquote from '../components/Blockquote';
import { edgesToGallery } from '../utils/gallery';
import { COLORS } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import blueprint from '../images/blueprint.svg';

const FPOGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${pxToRem(400)}, 1fr));
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

const BlockquoteContainer = PageContainer.extend`
  background-color: ${COLORS.highlight3};
  color: #fff;
  padding-top: 2rem;
  padding-bottom: 2rem;

  ${Blockquote} {
    text-align: center;
  }

  ${Blockquote.Citation} > :last-child {
    margin-bottom: 0;
  }

  ${Base} {
    text-transform: uppercase;
    margin-bottom: 0;
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

      <BlockquoteContainer>
        <Blockquote>
          <Blockquote.Quote>
            General Paving and Contracting, Inc. regularly use Priority Construction Corp. on a
            range of construction projects. Priority&rsquo;s crews are punctual and highly skilled
            in a variety of concrete jobs. Over the years, they have proven to be easy to work with
            and have consistently performed excellent work.
          </Blockquote.Quote>
          <Blockquote.Citation>
            <Base tag="h1">Robert L. Quinn, Jr.</Base>
            <p>General Paving & Contracting, Inc., Halethorpe, Maryland</p>
          </Blockquote.Citation>
        </Blockquote>
      </BlockquoteContainer>
    </React.Fragment>
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
  }
`;
