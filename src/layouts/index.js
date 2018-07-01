import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styled, { injectGlobal } from 'styled-components';
import Header from '../components/Header';
import PageContainer from '../components/PageContainer';
import FlatList from '../components/FlatList';
import base from '../styles/base.css';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${base}
`;

const Logo = styled.h1`
  ${props => `background-image: url('${props.image}');`}
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: contain;
  text-indent: -9999px;
  overflow: hidden;
  margin: 0;
`;

const LogoLink = styled(Link)`
  display: inline-block;
  height: 100px;
  width: 440px;
`;

const MainNav = styled.nav`
  a {
    color: #fff;
    &:hover {
      border-bottom: 3px solid #524763;
    }
  }
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
      bgImageSizes={data.background.sizes}
      isFullHeight={location.pathname === '/'}
    >
      <LogoLink to="/">
        <Logo image={data.logo.sizes.src}>
          {data.site.siteMetadata.title}
        </Logo>
      </LogoLink>
      <MainNav>
        <FlatList>
          <FlatList.Item>
            <Link to="/">Home</Link>
          </FlatList.Item>
          <FlatList.Item>
            <Link to="/about">About</Link>
          </FlatList.Item>
        </FlatList>
      </MainNav>
    </Header>
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
