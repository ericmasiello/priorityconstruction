import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import memoize from 'memoize-one';
import Link from 'gatsby-link';
import tinyColor from 'tinycolor2';
import base from '../styles/base.css';
import * as CustomPropTypes from '../propTypes';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HeroHomePageContent, { StyledContentWrapper } from '../components/HeroHomePageContent';
import HeroWithBanner from '../components/HeroWithBanner';
import PageHeaderBar from '../components/PageHeaderBar';
import Type2 from '../components/Type2';
import Type4 from '../components/Type4';
import Button from '../components/Button';
import Head from '../components/Head';
import { COLORS, MEDIA_QUERIES } from '../styles/vars';
import { siteBg } from '../styles/mixins';
import { pxToRem } from '../styles/utils';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${base}
`;

const StyledHeroHomePageContent = styled(HeroHomePageContent)`
  @media (min-width: ${pxToRem(MEDIA_QUERIES.heroL)}) {
    ${StyledContentWrapper} {
      background-color: ${COLORS.brand[0]};
    }
  }

  ${Type2} {
    margin-bottom: 0.5rem;
  }

  ${Type2}, ${Type4} {
    text-shadow: 0 0 2px
      ${tinyColor(COLORS.brand[1])
        .darken(30)
        .toRgbString()};
  }
`;

const getConfigFromPathname = (configs, pathname) => {
  const path = pathname.replace('/', '');
  return Object.assign({}, configs.base, configs[path]);
};

/* eslint-disable react/sort-comp, react/no-unused-state */
class Layout extends React.Component {
  static displayName = 'Layout';

  static propTypes = {
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
      backgroundServices: CustomPropTypes.ImageSharp,
      backgroundRequestQuote: CustomPropTypes.ImageSharp,
    }).isRequired,
    location: CustomPropTypes.Location.isRequired,
    className: PropTypes.string,
  };

  pageConfigs = {
    base: {
      background: this.props.data.backgroundHome,
      isFullHeight: false,
      heroChildren: null,
      title: '',
    },
    '': {
      isFullHeight: true,
      heroChildren: (
        <StyledHeroHomePageContent innerTag="hgroup">
          <Type2 tag="h1" uppercase>
            Bringing Concrete Ideas to Life
          </Type2>
          <Type4 tag="p">Quality workmanship & excellent customer service</Type4>
          <Button color="light" large tag={Link} to="/services">
            Our services
          </Button>
        </StyledHeroHomePageContent>
      ),
      className: 'hero-image-left',
    },
    services: {
      background: this.props.data.backgroundServices,
      isFullHeight: true,
      heroChildren: <HeroWithBanner title="Services" />,
      title: 'Services',
      imgStyle: {
        objectPosition: 'bottom center',
      },
    },
    quote: {
      background: this.props.data.backgroundRequestQuote,
      isFullHeight: true,
      heroChildren: <HeroWithBanner title="Request a Quote" />,
      title: 'Request a Quote',
    },
    about: {
      background: this.props.data.backgroundAbout,
      isFullHeight: true,
      heroChildren: <HeroWithBanner title="About Us" />,
      title: 'About Us',
      imgStyle: {
        objectPosition: 'top center',
      },
    },
    careers: {
      background: this.props.data.backgroundCareers,
      isFullHeight: true,
      heroChildren: <HeroWithBanner title="Career Opportunities" />,
      title: 'Career Opportunities',
    },
    contact: {
      isFullHeight: false,
      heroChildren: <HeroWithBanner title="Contact Us" />,
      title: 'Contact Us',
    },
    gallery: {
      background: this.props.data.backgroundGallery,
      heroChildren: <HeroWithBanner title="Project Gallery" />,
      title: 'Project Gallery',
    },
  };

  layout = memoize(pathname => getConfigFromPathname(this.pageConfigs, pathname));

  render() {
    const { children, data, className } = this.props;
    const { title, desc, keywords, address, phone } = data.site.siteMetadata;

    const layout = this.layout(this.props.location.pathname);

    return (
      <React.Fragment>
        <Head
          title={`${title}${layout.title ? `: ${layout.title}` : ''}`}
          description={desc}
          keywords={keywords.join(', ')}
        />
        <div className={className}>
          <main>
            <PageHeaderBar currentPathname={this.props.location.pathname} />
            <Hero
              selectedImage={layout.background}
              bgImages={Object.keys(this.props.data)
                .filter(key => key !== 'site')
                .reduce((acc, key) => {
                  acc.push(this.props.data[key]);
                  return acc;
                }, [])}
              isFullHeight={layout.isFullHeight}
              imgStyle={layout.imgStyle}
              className={layout.className}
            >
              {layout.heroChildren}
            </Hero>
            {children()}
          </main>
          <Footer {...address} phone={phone} />
        </div>
      </React.Fragment>
    );
  }
}

export default styled(Layout)`
  ${siteBg()};

  @media (min-width: ${pxToRem(MEDIA_QUERIES.heroL)}) {
    .hero-image-left {
      .gatsby-image-outer-wrapper {
        width: 50%;
      }
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
      }
    }

    backgroundHome: imageSharp(id: { regex: "/src/images/photos/heroes/Fells-20/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes
      }
    }

    backgroundAbout: imageSharp(id: { regex: "/src/images/photos/heroes/pigtown-crop2/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes
      }
    }

    backgroundServices: imageSharp(
      id: { regex: "/src/images/photos/heroes/anthem-house-plants-sidewalk-crop2/" }
    ) {
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

    backgroundRequestQuote: imageSharp(id: { regex: "/src/images/photos/heroes/CoppinState-2/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
