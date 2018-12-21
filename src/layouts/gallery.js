import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import memoize from 'memoize-one';
import base from '../styles/base.css';
import Head from '../components/Head';
import Footer from '../components/Footer';
import LayoutContext from '../layoutContext';
import PageHeaderBar from '../components/PageHeaderBar';
import { siteBg } from '../styles/mixins';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${base}
`;

/* eslint-disable react/sort-comp, react/no-unused-state */
class LayoutGallery extends React.Component {
  static displayName = 'LayoutGallery';

  static propTypes = {
    children: PropTypes.func.isRequired,
    className: PropTypes.string,
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
    }).isRequired,
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

  state = {
    toggleElement: null,
    scrollX: 0,
    scrollY: 0,
    hideLayoutElement: this.hideLayoutElement,
    displayLayoutElement: this.displayLayoutElement,
  };

  galleryTitle = memoize(pathname => {
    if (this.props.data && this.props.data.galleryMeta && this.props.data.galleryMeta.edges) {
      const result = this.props.data.galleryMeta.edges
        .filter(({ node }) => node.fields.slug === pathname)
        .map(({ node }) => node.frontmatter.name);
      if (result.length) {
        return result[0];
      }
      return '';
    }
    return '';
  });

  render() {
    const {
      children,
      className,
      data: {
        site: { siteMetadata },
      },
    } = this.props;
    const { title, desc, keywords, address, phone } = siteMetadata;
    const galleryTitle = this.galleryTitle(this.props.location.pathname);
    const styles = {
      display: this.state.toggleElement ? 'none' : undefined,
    };

    return (
      <LayoutContext.Provider value={this.state}>
        <Head
          title={`${title}: ${galleryTitle} Project Gallery`}
          description={desc}
          keywords={keywords.join(', ')}
        />
        <div className={className} style={styles}>
          <main>
            <PageHeaderBar currentPathname={this.props.location.pathname} />
            {children()}
          </main>
          <Footer {...address} phone={phone} />
        </div>
        {this.state.toggleElement}
      </LayoutContext.Provider>
    );
  }
}

export default styled(LayoutGallery)`
  ${siteBg()};
`;

export const query = graphql`
  query LayoutGalleryPageQuery {
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

    galleryMeta: allMarkdownRemark(filter: { id: { regex: "/content/gallery/" } }) {
      edges {
        node {
          frontmatter {
            name
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
