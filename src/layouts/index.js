import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import base from '../styles/base.css';
import * as CustomPropTypes from '../propTypes';
import FlatList from '../components/FlatList';
import ComposedFooter from '../composed/Footer';
import Hero from '../components/Hero';
import TopBar from '../components/TopBar';
import TopBarLink from '../components/TopBarLink';
import Small from '../components/Small';
import LayoutContext from '../layoutContext';
import MailIcon from '../components/MailIcon';
import PhoneIcon from '../components/PhoneIcon';
import HeroHomePageContent from '../components/HeroHomePageContent';
import HeroAboutPageContent from '../components/HeroAboutPageContent';
import HeroCareersPageContent from '../components/HeroCareersPageContent';
import HeroContactPageContent from '../components/HeroContactPageContent';
import PageHeaderBar from '../components/PageHeaderBar';
import { MEDIA_QUERIES } from '../styles/vars';
import { pxToRem } from '../styles/utils';

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
    logo: this.props.data.logo,
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
    const { title, desc, keywords, address, phone, fax, email } = data.site.siteMetadata;

    return (
      <LayoutContext.Provider value={this.state}>
        {this.state.toggleElement === null && (
          <div className={className}>
            <Helmet
              title={title}
              meta={[
                { name: 'description', content: desc },
                { name: 'keywords', content: keywords.join(', ') },
              ]}
            />
            <PageHeaderBar
              navRef={this.state.navRef}
              logo={this.state.logo}
              currentPathname={this.props.location.pathname}
            />
            <TopBar>
              <Small tag={FlatList}>
                <FlatList.Item>
                  <TopBarLink href={`tel:${phone}`}>
                    <PhoneIcon /> 
                    {' '}
                    {phone}
                  </TopBarLink>
                </FlatList.Item>
                <FlatList.Item>
                  <TopBarLink href={`mailto:${email}`}>
                    <MailIcon /> 
                    {' '}
                    {email}
                  </TopBarLink>
                </FlatList.Item>
              </Small>
            </TopBar>
            <Hero
              selectedImage={this.state.background}
              bgImages={[this.props.data.backgroundHome, this.props.data.backgroundAbout]}
              isFullHeight={this.state.isFullHeight}
            >
              {this.state.heroChildren}
            </Hero>
            <LayoutChildren>{children()}</LayoutChildren>
            <ComposedFooter {...address} logo={data.logo} phone={phone} fax={fax} email={email} />
          </div>
        )}
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
  display: flex;
  flex-direction: column;
  position: relative;

  ${PageHeaderBar}, ${Hero}, ${LayoutChildren}, ${ComposedFooter} {
    order: 1;
  }

  ${TopBar} {
    order: 1;
  }

  @media(min-width: ${pxToRem(MEDIA_QUERIES.navTransition)}) {
    ${TopBar} {
      order: 0;
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
        address {
          streetAddress
          state
          city
          zip
        }
        phone
        fax
        email
        urls {
          facebook
          linkedin
        }
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

    logo: imageSharp(id: { regex: "/priorityconstructionlogo.jpg/" }) {
      sizes(maxWidth: 800) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
