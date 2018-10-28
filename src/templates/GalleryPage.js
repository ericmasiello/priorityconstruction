import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Gallery from '../components/Gallery';
import GalleryItemWrapper from '../components/GalleryItemWrapper';
import ZoomImage from '../components/ZoomImage';
import Type2 from '../components/Type2';
import Type4 from '../components/Type4';
import GalleryItem from '../components/GalleryItem';
import List from '../components/List';
import ListItem from '../components/ListItem';
import * as CustomPropTypes from '../propTypes';
import { withLayoutContext } from '../layoutContext';
import GalleryOverlay from '../components/GalleryOverlay';
import { GRID_SIZE, GUTTER_SIZE, BODY_WEIGHTS } from '../styles/vars';
import { pxToRem } from '../styles/utils';

const MetaList = styled.dl`
  display: flex;
  margin: 0 0 1rem;
`;

const MetaTerm = styled.dt`
  font-weight: ${BODY_WEIGHTS.medium};
  margin-right: 0.5rem;
`;

const MetaDescription = styled.dd`
  margin: 0;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr ${pxToRem(GRID_SIZE * 4 + GUTTER_SIZE * 3)};
  grid-gap: 1rem;
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
    const { className, data: { meta: { frontmatter: meta } = {}, images } = {} } = this.props;

    if (!images) {
      return null;
    }
    return (
      <PageContainer tag="section" className={className}>
        <Layout>
          {/* TODO: figure out how to flip the order of these with grid */}
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
          <hgroup>
            <Type2 tag="h1">{meta.name}</Type2>
            <Type4>{meta.location}</Type4>
            <MetaList>
              <MetaTerm>Client:</MetaTerm>
              <MetaDescription>{meta.client}</MetaDescription>
            </MetaList>
            <MetaList>
              <MetaTerm>Scope:</MetaTerm>
              <MetaDescription>
                <List>
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
          </hgroup>
        </Layout>
      </PageContainer>
    );
  }
}

export default styled(withLayoutContext(GalleryPage))`
  padding-top: 4rem;

  ${Type2} {
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
  }
`;
