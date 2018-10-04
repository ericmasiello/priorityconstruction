import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import base from '../styles/base.css';
import * as CustomPropTypes from '../propTypes';
import ComposedFooter from '../composed/Footer';
import Hero from '../components/Hero';
import LayoutContext from '../layoutContext';
import HeroHomePageContent from '../components/HeroHomePageContent';
import HeroAboutPageContent from '../components/HeroAboutPageContent';
import HeroCareersPageContent from '../components/HeroCareersPageContent';
import HeroContactPageContent from '../components/HeroContactPageContent';
import PageHeaderBar from '../components/PageHeaderBar';

const LayoutChildren = styled.main``;

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
      heroChildren: null,
    },
    '': {
      isFullHeight: true,
      heroChildren: <HeroHomePageContent />,
    },
    about: {
      background: this.props.data.backgroundAbout,
      isFullHeight: true,
      heroChildren: <HeroAboutPageContent />,
    },
    careers: {
      isFullHeight: false,
      heroChildren: <HeroCareersPageContent />,
    },
    contact: {
      isFullHeight: false,
      heroChildren: <HeroContactPageContent />,
    },
  };

  displayLayoutElement = (Component, props) => {
    this.setState({
      toggleElement: <Component {...props} />,
      scrollX: window.pageXOffset,
      scrollY: window.pageYOffset,
    });
  };

  hideLayoutElement = () =>
    this.setState({ toggleElement: null }, () =>
      window.scrollTo(this.state.scrollX, this.state.scrollY),
    );

  /* eslint-disable react/no-unused-state */
  state = {
    title: this.props.data.site.siteMetadata.title,
    heroChildren: getConfigFromPathname(this.pageConfigs, this.props.location.pathname)
      .heroChildren,
    isFullHeight: getConfigFromPathname(this.pageConfigs, this.props.location.pathname)
      .isFullHeight,
    background: getConfigFromPathname(this.pageConfigs, this.props.location.pathname).background,
    navRef: React.createRef(),
    toggleElement: null,
    displayLayoutElement: this.displayLayoutElement,
    hideLayoutElement: this.hideLayoutElement,
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
    const { children, data, className } = this.props;
    const { title, desc, keywords, address, phone } = data.site.siteMetadata;
    const styles = {
      display: this.state.toggleElement ? 'none' : undefined,
    };

    return (
      <LayoutContext.Provider value={this.state}>
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: desc },
            { name: 'keywords', content: keywords.join(', ') },
          ]}
        />
        <div className={className} style={styles}>
          <div>
            <PageHeaderBar
              navRef={this.state.navRef}
              currentPathname={this.props.location.pathname}
            />
            <Hero
              selectedImage={this.state.background}
              bgImages={[this.props.data.backgroundHome, this.props.data.backgroundAbout]}
              isFullHeight={this.state.isFullHeight}
            >
              {this.state.heroChildren}
            </Hero>
            <LayoutChildren>{children()}</LayoutChildren>
          </div>
          <ComposedFooter {...address} phone={phone} />
        </div>
        {this.state.toggleElement}
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
      }),
    }),
    backgroundHome: CustomPropTypes.ImageSharp,
    backgroundAbout: CustomPropTypes.ImageSharp,
  }).isRequired,
  location: CustomPropTypes.Location.isRequired,
  className: PropTypes.string,
};

Layout.displayName = 'Layout';

export default styled(Layout)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  position: relative;
`;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        desc
        keywords
        address {
          streetAddress
          state
          city
          zip
        }
        phone
      }
    }

    backgroundHome: imageSharp(id: { regex: "/src/images/photos/heroes/poolside/" }) {
      sizes(maxWidth: 1240) {
        ...GatsbyImageSharpSizes
      }
    }

    backgroundAbout: imageSharp(id: { regex: "/src/images/photos/heroes/underpass/" }) {
      sizes(maxWidth: 1240) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
