import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from '../components/Container';
import Gallery from '../components/Gallery';
import GalleryItemWrapper from '../components/GalleryItemWrapper';
import ZoomImage from '../components/ZoomImage';
import GalleryItem from '../components/GalleryItem';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Hero from '../components/Hero';
import GalleryOverlay from '../components/GalleryOverlay';
import MarkdownBlock from '../components/MarkdownBlock';
import HeroWithBanner from '../components/HeroWithBanner';
import * as CustomPropTypes from '../propTypes';
import { withLayoutContext } from '../layoutContext';
import { GRID_SIZE, GUTTER_SIZE, BODY_WEIGHTS } from '../styles/vars';

import { pxToRem } from '../styles/utils';

const MetaBlock = styled.aside`
  padding-left: ${pxToRem(GUTTER_SIZE)};
  padding-right: ${pxToRem(GUTTER_SIZE)};

  @media (min-width: ${pxToRem(1000)}) {
    grid-column: 2;
  }
`;

const MetaList = styled.dl`
  margin: 0 0 1rem;
`;

const MetaTerm = styled.dt`
  font-weight: ${BODY_WEIGHTS.bold};
`;

const MetaDescription = styled.dd`
  margin: 0;
`;

const Layout = styled.div`
  @media (min-width: ${pxToRem(1000)}) {
    display: grid;
    grid-gap: 1rem;
    grid-auto-flow: dense;
    grid-template-columns: 1fr ${pxToRem(GRID_SIZE * 3 + GUTTER_SIZE * 2)};
  }
  @media (min-width: ${pxToRem(1100)}) {
    grid-template-columns: 1fr ${pxToRem(GRID_SIZE * 4 + GUTTER_SIZE * 3)};
  }
`;

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
    const {
      className,
      data: { meta: { frontmatter: meta, html: metaContent } = {}, images, background } = {},
    } = this.props;

    if (!images) {
      return null;
    }
    return (
      <React.Fragment>
        <Hero selectedImage={background} bgImages={[background]} isFullHeight>
          <HeroWithBanner title={meta.name} subtitle={meta.location} />
        </Hero>
        <Container plus tag="section" className={className}>
          <Layout>
            <MetaBlock>
              <MarkdownBlock dangerouslySetInnerHTML={{ __html: metaContent }} />
              <MetaList>
                <MetaTerm>Client:</MetaTerm>
                <MetaDescription>{meta.client}</MetaDescription>
              </MetaList>
              <MetaList>
                <MetaTerm>Scope:</MetaTerm>
                <MetaDescription>
                  <List decorated>
                    {(meta.scope || []).map(item => (
                      <ListItem key={item}>{item}</ListItem>
                    ))}
                  </List>
                </MetaDescription>
              </MetaList>
              <MetaList>
                <MetaTerm>Completion Date:</MetaTerm>
                <MetaDescription>{meta.completionDate}</MetaDescription>
              </MetaList>
              <MetaList>
                <MetaTerm>Project Value:</MetaTerm>
                <MetaDescription>{meta.value}</MetaDescription>
              </MetaList>
            </MetaBlock>
            <Gallery>
              {images.edges.map((edge, i) => (
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
          </Layout>
        </Container>
      </React.Fragment>
    );
  }
}

export default styled(withLayoutContext(GalleryPage))`
  padding-top: 4rem;
  padding-bottom: 1rem;

  ${Gallery} {
    grid-template-columns: 1fr;
  }

  ${GalleryItem} {
    cursor: pointer;
  }

  @media (min-width: ${pxToRem(700)}) {
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
  query GalleryPageQuery($slug: String!, $imageDir: String!, $coverPhoto: String!) {
    meta: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        name
        location
        coverPhoto
        client
        scope
        completionDate
        value
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

    background: imageSharp(id: { regex: $coverPhoto }) {
      sizes(quality: 85) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
