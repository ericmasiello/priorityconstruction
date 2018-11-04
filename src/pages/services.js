import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GatsbyImage from '../components/GatsbyImage';
import PageContainer from '../components/PageContainer';
import Container from '../components/Container';
import MarkdownBlock from '../components/MarkdownBlock';
import * as CustomPropTypes from '../propTypes';
import Type3 from '../components/Type3';
import mergeServiceWithImages from '../utils/services';
import { TYPE_SIZE, COLORS, MAX_CONTENT_WIDTH_PLUS, MAX_CONTENT_WIDTH } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import { type } from '../styles/mixins';

const blockStyles = `
  margin-bottom: 4rem;
  @media (min-width: ${pxToRem(850)}) {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(12, 1fr);
  }
`;

const Content = styled.div`
  ${type(TYPE_SIZE.t5)};
`;

const Intro = styled(Container)`
  ${blockStyles};

  ${Content} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    grid-column: 1 / 8;
  }

  .gatsby-image-outer-wrapper {
    grid-column: 8 / -1;
  }
`;

const ConcreteFlatwork = styled(Container)`
  ${blockStyles};
  background-color: ${COLORS.gray[1]};
  padding: 1rem ${pxToRem((MAX_CONTENT_WIDTH_PLUS - MAX_CONTENT_WIDTH) / 2)};

  ${Content} {
    grid-column: 1 / 9;
    grid-row: 1 / 2;
    background-color: ${COLORS.brand[0]};
    color: #fff;
    padding: 1rem;
  }

  ${GatsbyImage} {
    height: 100%;
  }

  ${MarkdownBlock} {
    ul {
      display: flex;
      flex-wrap: wrap;
    }

    li {
      &:not(:last-child)::after {
        content: '·';
        font-weight: bold;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
    }
  }

  .gatsby-image-outer-wrapper {
    &:nth-child(2) {
      grid-column: 9 / -1;
      grid-row: 1 / 3;
    }

    &:nth-child(3) {
      grid-column: 1 / 6;
      grid-row: 2 / 3;
    }

    &:nth-child(4) {
      grid-column: 6 / 9;
      grid-row: 2 / 3;
    }
  }
`;

const Hardscapes = styled(Container)`
  ${blockStyles};

  ${Content} {
    grid-column: 7 / -1;
    grid-row: 1 / 3;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  ${GatsbyImage} {
    height: 100%;
  }

  .gatsby-image-outer-wrapper {
    &:nth-child(2) {
      grid-column: 1 / 7;
      grid-row: 1 / 2;
    }

    &:nth-child(3) {
      grid-column: 1 / 7;
      grid-row: 2 / 3;
    }
  }
`;

class Services extends React.PureComponent {
  static displayName = 'Services';

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
      intro: CustomPropTypes.Service,
      concreteFlatwork: CustomPropTypes.Service,
      hardscapes: CustomPropTypes.Service,
      structuralConcrete: CustomPropTypes.Service,
      images: CustomPropTypes.AllImageSharp,
    }).isRequired,
  };

  render() {
    const { className, data } = this.props;
    const intro = mergeServiceWithImages(data.intro, data.images.edges);
    const concreteFlatwork = mergeServiceWithImages(data.concreteFlatwork, data.images.edges);
    const hardscapes = mergeServiceWithImages(data.hardscapes, data.images.edges);
    const structuralConcrete = mergeServiceWithImages(data.structuralConcrete, data.images.edges);

    return (
      <PageContainer plus className={className}>
        <Intro tag="section">
          <Content>
            <Type3 tag="h1" uppercase weight="bold">
              {intro.title}
            </Type3>
            <MarkdownBlock dangerouslySetInnerHTML={{ __html: intro.content }} />
          </Content>
          <GatsbyImage {...intro.images[0]} />
        </Intro>

        <ConcreteFlatwork plus tag="section">
          <Content>
            <Type3 tag="h1" uppercase weight="medium">
              {concreteFlatwork.title}
            </Type3>
            <MarkdownBlock dangerouslySetInnerHTML={{ __html: concreteFlatwork.content }} />
          </Content>
          {concreteFlatwork.images.map(image => (
            <GatsbyImage {...image} key={image.id} />
          ))}
        </ConcreteFlatwork>

        <Hardscapes tag="section">
          <Content>
            <Type3 tag="h1" uppercase weight="bold">
              {hardscapes.title}
            </Type3>
            <MarkdownBlock dangerouslySetInnerHTML={{ __html: hardscapes.content }} />
          </Content>
          {hardscapes.images.map(image => (
            <GatsbyImage {...image} key={image.id} />
          ))}
        </Hardscapes>
        <section>
          <Type3 tag="h1">{structuralConcrete.title}</Type3>
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: structuralConcrete.content }} />
        </section>
      </PageContainer>
    );
  }
}

export default styled(Services)`
  padding-top: 2rem;
  padding-bottom: 3rem;
`;

export const query = graphql`
  query ServicesPage {
    intro: markdownRemark(id: { regex: "/content/services/intro/" }) {
      html
      frontmatter {
        title
        images {
          image
          alt
        }
      }
    }

    concreteFlatwork: markdownRemark(id: { regex: "/content/services/concrete-flatwork/" }) {
      html
      frontmatter {
        title
        images {
          image
          alt
        }
      }
    }

    hardscapes: markdownRemark(id: { regex: "/content/services/hardscapes/" }) {
      html
      frontmatter {
        title
        images {
          image
          alt
        }
      }
    }

    structuralConcrete: markdownRemark(id: { regex: "/content/services/structural-concrete/" }) {
      html
      frontmatter {
        title
        images {
          image
          alt
        }
      }
    }

    images: allImageSharp(limit: 100, filter: { id: { regex: "/images/photos/services/" } }) {
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
