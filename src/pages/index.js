import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as CustomPropTypes from '../propTypes';
import PageContainer from '../components/PageContainer';
import PhotoGrid from '../components/PhotoGrid';
import Placeholder from '../components/Placeholder';
import Type4 from '../components/Type4';
import { edgesToGallery } from '../utils/gallery';
import { COLORS } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import blueprint from '../images/blueprint.svg';

const FPOGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${pxToRem(400)}, 1fr));
  grid-template-rows: repeat(2, ${pxToRem(225)});
  grid-gap: 1rem;
  margin-bottom: ${pxToRem(160)};

  ${Type4} {
    color: ${COLORS.highlight3};
    text-transform: uppercase;
  }
`;

const HomePage = props => {
  const { data, className } = props;
  const photoGridProps = edgesToGallery(data.homageGallery.edges, 'courtyard.jpg');

  return (
    <PageContainer tag="section" className={className}>
      <FPOGrid>
        <Placeholder>
          <Type4>Our Team</Type4>
        </Placeholder>
        <Placeholder>
          <Type4>Our Expertise</Type4>
        </Placeholder>
      </FPOGrid>
      <PhotoGrid {...photoGridProps} />
    </PageContainer>
  );
};

HomePage.displayName = 'HomePage';

HomePage.propTypes = {
  data: PropTypes.shape({
    homageGallery: CustomPropTypes.AllImageSharp,
  }).isRequired,
  className: PropTypes.string,
};

export default styled(HomePage)`
  background-image: url(${blueprint});
  background-size: cover;
  background-position: center center;
  position: relative;
  padding-top: ${pxToRem(70)};

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
