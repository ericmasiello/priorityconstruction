import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import base from '../styles/base.css';
import Footer from '../components/Footer';
import LayoutContext from '../layoutContext';
import PageHeaderBar from '../components/PageHeaderBar';

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

  render() {
    const { children, className, data } = this.props;
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

export default styled(LayoutGallery)``;

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
  }
`;
