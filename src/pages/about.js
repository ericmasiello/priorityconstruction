import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PageContainer from '../components/PageContainer';
import MarkdownBlock from '../components/MarkdownBlock';
import * as CustomPropTypes from '../propTypes';

class About extends React.PureComponent {
  static displayName = 'About';

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
      mission: CustomPropTypes.Markdown,
      history: CustomPropTypes.Markdown,
      certifications: CustomPropTypes.Markdown,
      intro: CustomPropTypes.Markdown,
      awards: CustomPropTypes.Markdown,
    }),
  };

  render() {
    const { className, data } = this.props;

    return (
      <PageContainer tag="section" className={className}>
        <MarkdownBlock tag="section" dangerouslySetInnerHTML={{ __html: data.intro.html }} />
        <MarkdownBlock tag="section" dangerouslySetInnerHTML={{ __html: data.history.html }} />
        <MarkdownBlock tag="section" dangerouslySetInnerHTML={{ __html: data.mission.html }} />
        <MarkdownBlock
          tag="section"
          dangerouslySetInnerHTML={{ __html: data.certifications.html }}
        />
        <MarkdownBlock tag="section" dangerouslySetInnerHTML={{ __html: data.awards.html }} />
      </PageContainer>
    );
  }
}

export default styled(About)`
  padding-top: 2rem;
`;

export const query = graphql`
  query AboutPage {
    intro: markdownRemark(id: { regex: "/content/about/intro/" }) {
      html
    }

    mission: markdownRemark(id: { regex: "/content/about/mission/" }) {
      html
    }

    history: markdownRemark(id: { regex: "/content/about/history/" }) {
      html
    }

    certifications: markdownRemark(id: { regex: "/content/about/certifications/" }) {
      html
    }

    awards: markdownRemark(id: { regex: "/content/about/awards/" }) {
      html
    }
  }
`;
