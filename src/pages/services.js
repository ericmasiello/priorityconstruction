import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PageContainer from '../components/PageContainer';
import MarkdownBlock from '../components/MarkdownBlock';
import * as CustomPropTypes from '../propTypes';
import Type3 from '../components/Type3';
import mergeServiceWithImages from '../utils/services';

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
      <PageContainer tag="section" className={className}>
        <section>
          <Type3 tag="h1">{intro.title}</Type3>
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: intro.content }} />
        </section>
        <section>
          <Type3 tag="h1">{concreteFlatwork.title}</Type3>
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: concreteFlatwork.content }} />
        </section>
        <section>
          <Type3 tag="h1">{hardscapes.title}</Type3>
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: hardscapes.content }} />
        </section>
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
