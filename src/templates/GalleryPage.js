import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Gallery from '../components/Gallery';
import GalleryItemWrapper from '../components/GalleryItemWrapper';
import ZoomImage from '../components/ZoomImage';
import Type1 from '../components/Type1';
import Type4 from '../components/Type4';
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

  componentWillUnmount() {
    this.props.hideLayoutElement();
  }

  handleSelectImageByIndex = selectedIndex => event => {
    if (
      event.type === 'click' ||
      (event.type === 'keypress' && (event.key === ' ' || event.key === 'Enter'))
    ) {
      this.props.displayLayoutElement(GalleryOverlay, {
        selectedIndex,
        onClose: this.props.hideLayoutElement,
        onResetSelection: this.props.hideLayoutElement,
        images: this.props.data.images,
      });
    }
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
          <Type4>{data.meta.frontmatter.location}</Type4>
        </hgroup>
        <Gallery>
          {data.images.edges.map((edge, i) => (
            <GalleryItemWrapper key={edge.node.id}>
              <GalleryItem
                role="button"
                tabIndex={0}
                onClick={this.handleSelectImageByIndex(i)}
                onKeyPress={this.handleSelectImageByIndex(i)}
              >
                <ZoomImage sizes={edge.node.sizes} />
              </GalleryItem>
            </GalleryItemWrapper>
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

  ${GalleryItem} {
    cursor: pointer;
  }

  @media (min-width: 700px) {
    ${Gallery} {
      grid-template-columns: repeat(auto-fit, minmax(${pxToRem(300)}, 1fr));
    }

    ${GalleryItemWrapper} {
      &:nth-child(5n + 1) {
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
          sizes(quality: 85) {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
  }
`;
