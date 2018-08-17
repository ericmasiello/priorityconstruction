import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Gallery from '../components/Gallery';
import Type1 from '../components/Type1';
import Type5 from '../components/Type5';
import GalleryItem from '../components/GalleryItem';
import * as CustomPropTypes from '../propTypes';
import { pxToRem } from '../styles/utils';
import { withLayoutContext } from '../layoutContext';
import GalleryOverlay from '../components/GalleryOverlay';

class GalleryPage extends React.Component {
  static displayName = 'GalleryPage';
  static propTypes = {
    data: PropTypes.shape({
      meta: CustomPropTypes.GalleryMeta,
      images: CustomPropTypes.AllImageSharp,
    }).isRequired,
    className: PropTypes.string,
    displayLayoutElement: PropTypes.func.isRequired,
    hideLayoutElement: PropTypes.func.isRequired,
  };

  handleSelectImageByIndex = selectedIndex => () => {
    this.props.displayLayoutElement(GalleryOverlay, {
      selectedIndex,
      onClose: this.props.hideLayoutElement,
      onResetSelection: this.props.hideLayoutElement,
      images: this.props.data.images,
    });
  };

  render() {
    const { className, data } = this.props;

    if (!data.images) {
      return null;
    }
    return (
      <PageContainer tag="section" className={className}>
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
      </PageContainer>
    );
  }
}

export default styled(withLayoutContext(GalleryPage))`
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
