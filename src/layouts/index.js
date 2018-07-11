import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import Masthead from '../components/Masthead';
import HeaderBar from '../components/HeaderBar';
import PageContainer from '../components/PageContainer';
import FlatList from '../components/FlatList';
import Logo from '../components/Logo';
import MainNavLink from '../components/MainNavLink';
import base from '../styles/base.css';
import { pxToRem } from '../styles/utils';
import * as CustomPropTypes from '../propTypes';

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

  return (
    <div className={className}>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: data.site.siteMetadata.desc },
          { name: 'keywords', content: data.site.siteMetadata.keywords.join(', ') },
        ]}
      />
      <Masthead
        bgImage={data.background}
        isFullHeight={location.pathname === '/'}
      >
        <HeaderBar>
          <Logo image={data.logo} />
          <nav>
            <FlatList>
              <FlatList.Item>
                <MainNavLink to="/services">Services</MainNavLink>
              </FlatList.Item>
              <FlatList.Item>
                <MainNavLink to="/about">About</MainNavLink>
              </FlatList.Item>
              <FlatList.Item>
                <MainNavLink to="/careers">Careers</MainNavLink>
              </FlatList.Item>
              <FlatList.Item>
                <MainNavLink to="/contact">Contact</MainNavLink>
              </FlatList.Item>
            </FlatList>
          </nav>
        </HeaderBar>
      </Masthead>
      <PageContainer>
        {children()}
      </PageContainer>
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
      }),
    }),
    background: CustomPropTypes.ImageSharp,
    logo: CustomPropTypes.ImageSharp,
  }).isRequired,
  location: CustomPropTypes.Location.isRequired,
  className: PropTypes.string,
};

Layout.displayName = 'Layout';

export default styled(Layout)`
  ${FlatList.Item} {
    margin-right: ${pxToRem(30)};

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        desc
        keywords
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
