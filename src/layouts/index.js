import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import base from '../styles/base.css';
import * as CustomPropTypes from '../propTypes';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import LayoutContext from '../layoutContext';
import HeroHomePageContent from '../components/HeroHomePageContent';
import HeroWithBanner from '../components/HeroWithBanner';
import PageHeaderBar from '../components/PageHeaderBar';

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
      heroChildren: <HeroWithBanner title="About Us" />,
    },
    careers: {
      background: this.props.data.backgroundCareers,
      isFullHeight: false,
      heroChildren: <HeroWithBanner title="Career Opportunities" />,
    },
    contact: {
      isFullHeight: false,
      heroChildren: <HeroWithBanner title="Contact Us" />,
    },
    gallery: {
      background: this.props.data.backgroundGallery,
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
          <main>
            <PageHeaderBar
              navRef={this.state.navRef}
              currentPathname={this.props.location.pathname}
            />
            <Hero
              selectedImage={this.state.background}
              bgImages={[
                this.props.data.backgroundHome,
                this.props.data.backgroundAbout,
                this.props.data.backgroundGallery,
                this.props.data.backgroundCareers,
              ]}
              isFullHeight={this.state.isFullHeight}
            >
              {this.state.heroChildren}
            </Hero>
            {children()}
          </main>
          <Footer {...address} phone={phone} />
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
    backgroundGallery: CustomPropTypes.ImageSharp,
    backgroundCareers: CustomPropTypes.ImageSharp,
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

    backgroundHome: imageSharp(id: { regex: "/src/images/photos/heroes/CoppinState-2/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes
      }
    }

    backgroundAbout: imageSharp(id: { regex: "/src/images/photos/heroes/Fells-27/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes
      }
    }

    backgroundGallery: imageSharp(id: { regex: "/src/images/photos/heroes/Fells-19/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes
      }
    }

    backgroundCareers: imageSharp(id: { regex: "/src/images/photos/heroes/PriorityShovel/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
