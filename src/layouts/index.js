import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import PageContainer from '../components/PageContainer';
import base from '../styles/base.css';
import * as CustomPropTypes from '../propTypes';
import ComposedFooter from '../composed/Footer';
import ComposedMasthead from '../composed/Masthead';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${base}
`;

const Layout = (props) => {
  const {
    children,
    data,
    location,
    className,
  } = props;

  const {
    title,
    desc,
    keywords,
    address,
    phone,
    fax,
    email,
  } = data.site.siteMetadata;

  return (
    <div className={className}>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: desc },
          { name: 'keywords', content: keywords.join(', ') },
        ]}
      />
      <ComposedMasthead
        background={data.background}
        isFullHeight={location.pathname === '/'}
        logo={data.logo}
      />
      <PageContainer>
        {children()}
      </PageContainer>
      <ComposedFooter
        {...address}
        logo={data.logo}
        phone={phone}
        fax={fax}
        email={email}
      />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
        desc: PropTypes.string,
        keywords: PropTypes.arrayOf(PropTypes.string),
        address: PropTypes.shape({
          streetAddress: PropTypes.string.isRequired,
          city: PropTypes.string.isRequired,
          state: PropTypes.string.isRequired,
          zip: PropTypes.number.isRequired,
        }),
        phone: PropTypes.string.isRequired,
        fax: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
    }),
    background: CustomPropTypes.ImageSharp,
    logo: CustomPropTypes.ImageSharp,
  }).isRequired,
  location: CustomPropTypes.Location.isRequired,
  className: PropTypes.string,
};

Layout.displayName = 'Layout';

export default styled(Layout)``;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        desc
        keywords,
        address {
          streetAddress
          state
          city
          zip
        }
        phone
        fax
        email
      }
    }

    background: imageSharp(id: {
      regex: "/src/images/photos/poolside/"
    }) {
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
