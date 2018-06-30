import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectGlobal } from 'styled-components';

import Header from '../components/Header';
import base from '../styles/base.css';

/* eslint-disable-next-line */
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
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
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
