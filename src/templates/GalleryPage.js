import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Gallery from '../components/Gallery';
import Type1 from '../components/Type1';
import Type5 from '../components/Type5';
import GalleryItem from '../components/GalleryItem';
import GatsbyImage from '../components/GatsbyImage';
import FlatList from '../components/FlatList';
import CloseIcon from '../components/CloseIcon';
import InvisibleButton from '../components/InvisibleButton';
import * as CustomPropTypes from '../propTypes';
import { pxToRem } from '../styles/utils';

const GalleryOverlayTileImageHeight = pxToRem(120);

const GalleryOverlay = styled.article`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.95);
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 100vh;
  display: grid;
  grid-template-rows: calc(100vh - ${GalleryOverlayTileImageHeight}) ${GalleryOverlayTileImageHeight};

  .gatsby-image-outer-wrapper {
    height: 100%;
  }
`;

const GalleryOverlayPrimaryImage = GatsbyImage.extend`
  height: 100%;
`;

const GalleryOverviewList = FlatList.extend`
  display: grid;
  grid-template-columns: repeat(10, minmax(150px, 1fr));
  grid-gap: 0.5rem;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0.5rem;

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  ${GatsbyImage} {
    height: 100%;

    div {
      padding-bottom: 0 !important;
    }
  }
`;

GalleryOverviewList.Item = FlatList.Item.extend`
  &:not(:last-child) {
    margin-right: 0;
  }
`;

const GalleryOverviewCloseButton = InvisibleButton.extend`
  position: absolute;
  z-index: 3;
  top: 1rem;
  right: 1rem;
  width: ${pxToRem(30)};
  height: ${pxToRem(30)};
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem;

  ${CloseIcon} {
    stroke: #fff;
  }
`;

class GalleryPage extends React.Component {
  state = { selectedIndex: 0 };

  getPortalNode = () => {
    let elm = document.getElementById('overlay');
    if (!elm) {
      elm = document.createElement('div');
      elm.id = 'overlay';
      document.body.appendChild(elm);
    }
    return elm;
  };

  handleResetSelection = () => this.setState({ selectedIndex: null });

  handleSelectImageByIndex = selectedIndex => () => {
    this.setState({ selectedIndex });
  };

  selectedImage = () => {
    if (this.state.selectedIndex === null) {
      return {
        sizes: {},
      };
    }

    const edge = this.props.data.images.edges[this.state.selectedIndex];
    return edge.node;
  };

  render() {
    const { className, data } = this.props;

    if (!data.images) {
      return null;
    }
    return (
      <PageContainer tag="section" className={className}>
        {this.state.selectedIndex === null && (
          <React.Fragment>
            <hgroup>
              <Type1>{data.meta.frontmatter.name}</Type1>
              <Type5>{data.meta.frontmatter.location}</Type5>
            </hgroup>
            <Gallery>
              {data.images.edges.map((edge, i) => (
                <Gallery.Item key={edge.node.id}>
                  <GalleryItem onClick={this.handleSelectImageByIndex(i)}>
                    <GalleryItem.Image sizes={edge.node.sizes} />
                  </GalleryItem>
                </Gallery.Item>
              ))}
            </Gallery>
          </React.Fragment>
        )}
        {this.state.selectedIndex !== null &&
          ReactDOM.createPortal(
            <GalleryOverlay>
              <GalleryOverviewCloseButton onClick={this.handleResetSelection}>
                <CloseIcon />
              </GalleryOverviewCloseButton>
              <GalleryOverlayPrimaryImage sizes={this.selectedImage().sizes} />
              <GalleryOverviewList>
                {data.images.edges.map((edge, i) => (
                  <GalleryOverviewList.Item
                    key={edge.node.id}
                    onClick={this.handleSelectImageByIndex(i)}
                  >
                    <GatsbyImage sizes={edge.node.sizes} />
                  </GalleryOverviewList.Item>
                ))}
              </GalleryOverviewList>
            </GalleryOverlay>,
            this.getPortalNode(),
          )}
      </PageContainer>
    );
  }
}

/*
<GalleryOverviewList>
              {data.images.edges.map((edge, i) => (
                <GalleryOverviewList.Item key={edge.node.id}>
                  <GatsbyImage sizes={edge.node.sizes} />
                </GalleryOverviewList.Item>
              ))}
            </GalleryOverviewList>
*/

GalleryPage.propTypes = {
  data: PropTypes.shape({
    meta: CustomPropTypes.GalleryMeta,
    images: CustomPropTypes.AllImageSharp,
  }).isRequired,
  className: PropTypes.string,
};

export default styled(GalleryPage)`
  padding-top: 4rem;

  ${Type1} {
    margin-bottom: 0;
  }

  ${Gallery} {
    grid-template-columns: 1fr;
  }

  @media (min-width: 700px) {
    ${Gallery} {
      grid-template-columns: repeat(auto-fit, minmax(${pxToRem(300)}, 1fr));
    }

    ${Gallery.Item} {
      &:nth-child(3n + 1) {
        grid-column: span 2;
        grid-row: span 2;
      }
    }
  }
`;

export const query = graphql`
  query GalleryPageQuery($slug: String!, $imageDir: String!) {
    meta: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        name
        location
        coverPhoto
      }
      html
    }

    images: allImageSharp(limit: 100, filter: { id: { regex: $imageDir } }) {
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
