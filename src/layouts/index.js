import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectGlobal } from 'styled-components';

import Header from '../components/Header';
import PageContainer from '../components/PageContainer';
import base from '../styles/base.css';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${base}
`;

const TemplateWrapper = ({ children, data, location }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: data.site.siteMetadata.desc },
        { name: 'keywords', content: data.site.siteMetadata.keywords.join(', ') },
      ]}
    />
    <Header
      title={data.site.siteMetadata.title}
      data={data}
      location={location}
    />
    <PageContainer>
      {children()}
    </PageContainer>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
        desc: PropTypes.string,
        keywords: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
    background: PropTypes.shape({
      sizes: PropTypes.shape({}),
    }),
    logo: PropTypes.shape({
      sizes: PropTypes.shape({}),
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default TemplateWrapper;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        desc
        keywords
      }
    }

    background: imageSharp(id: { regex: "/bg.jpeg/" }) {
      sizes(maxWidth: 1240) {
        ...GatsbyImageSharpSizes
      }
    }

    logo: imageSharp(id: { regex: "/priorityconstructionlogo.jpg/" }) {
      sizes(maxWidth: 800) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
