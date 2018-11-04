import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PageContainer from '../components/PageContainer';
import MarkdownBlock from '../components/MarkdownBlock';
import * as CustomPropTypes from '../propTypes';
import Type3 from '../components/Type3';

/* eslint-disable react/prefer-stateless-function */
class Services extends React.Component {
  static displayName = 'Services';

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
      concreteFlatwork: CustomPropTypes.Service,
      hardscapes: CustomPropTypes.Service,
      structuralConcrete: CustomPropTypes.Service,
    }).isRequired,
  };

  render() {
    const { className, data } = this.props;

    return (
      <PageContainer tag="section" className={className}>
        <section>
          <Type3 tag="h1">{data.concreteFlatwork.frontmatter.title}</Type3>
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: data.concreteFlatwork.html }} />
        </section>
        <section>
          <Type3 tag="h1">{data.hardscapes.frontmatter.title}</Type3>
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: data.hardscapes.html }} />
        </section>
        <section>
          <Type3 tag="h1">{data.structuralConcrete.frontmatter.title}</Type3>
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: data.structuralConcrete.html }} />
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
  }
`;
