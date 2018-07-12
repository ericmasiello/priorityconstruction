import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import PageContainer from '../components/PageContainer';
import base from '../styles/base.css';
import * as CustomPropTypes from '../propTypes';
import HeaderBar from '../components/HeaderBar';
import Logo from '../components/Logo';
import MainNavLink from '../components/MainNavLink';
import FlatList from '../components/FlatList';
import ComposedFooter from '../composed/Footer';
import Hero from '../components/Hero';
import HeroBanner from '../components/HeroBanner';
import LayoutContext from '../layoutContext';
import { pxToRem } from '../styles/utils';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${base}
`;

const getConfigFromPathname = (configs, pathname) => {
  const path = pathname.replace('/', '');
  return Object.assign({}, configs.base, configs[path]);
};

class Layout extends React.Component {
  /* eslint-disable react/sort-comp */
  pageConfigs = {
    base: {
      background: this.props.data.backgroundHome,
      isFullHeight: false,
      pageTitle: null,
    },
    '': {
      isFullHeight: true,
    },
    about: {
      background: this.props.data.backgroundAbout,
      isFullHeight: true,
      pageTitle: 'About Us',
    },
    careers: {
      isFullHeight: false,
    },
    contact: {
      isFullHeight: false,
    },
  };

  /* eslint-disable react/no-unused-state */
  state = {
    logo: this.props.data.logo,
    title: this.props.data.site.siteMetadata.title,
    pageTitle: getConfigFromPathname(this.pageConfigs, this.props.location.pathname).pageTitle,
    isFullHeight: getConfigFromPathname(
      this.pageConfigs,
      this.props.location.pathname,
    ).isFullHeight,
    background: getConfigFromPathname(this.pageConfigs, this.props.location.pathname).background,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const config = getConfigFromPathname(this.pageConfigs, nextProps.location.pathname);

      this.setState({
        ...config,
      });
    }
  }

  render() {
    const {
      children,
      data,
      className,
    } = this.props;

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
      <LayoutContext.Provider value={this.state}>
        <div className={className}>
          <Helmet
            title={title}
            meta={[
              { name: 'description', content: desc },
              { name: 'keywords', content: keywords.join(', ') },
            ]}
          />
          <HeaderBar>
            <Logo image={this.state.logo} />
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
          <Hero
            bgImage={this.state.background}
            isFullHeight={this.state.isFullHeight}
          >
            {this.state.pageTitle && <HeroBanner>{this.state.pageTitle}</HeroBanner>}
          </Hero>
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
      </LayoutContext.Provider>
    );
  }
}

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
    backgroundHome: CustomPropTypes.ImageSharp,
    backgroundAbout: CustomPropTypes.ImageSharp,
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

    backgroundHome: imageSharp(id: {
      regex: "/src/images/photos/heroes/poolside/"
    }) {
      sizes(maxWidth: 1240) {
        ...GatsbyImageSharpSizes
      }
    }

    backgroundAbout: imageSharp(id: {
      regex: "/src/images/photos/heroes/underpass/"
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
