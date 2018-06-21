import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Img from 'gatsby-image';

const HeaderWrapper = styled.div`
  background: #524763;
  margin-bottom: 1.45rem;
  overflow: hidden;
  position: relative;
  height: ${({ isHome }) => (isHome ? '70vh' : '20vh')};
  h1 {
    img {
      height: 80px;
    }
  }
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.h1`
  ${props => `background-image: url('${props.image}');`}
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
  ul {
    list-style: none;
    display: flex;
    li {
      margin-left: 10px;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
        Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      a {
        text-decoration: none;
        color: #fff;
        &:hover {
          border-bottom: 3px solid #524763;
        }
      }
    }
  }
`;

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    data: PropTypes.shape({
      background: PropTypes.shape({
        sizes: PropTypes.shape({}),
      }),
      logo: PropTypes.shape({
        sizes: PropTypes.shape({}),
      }),
    }).isRequired,
  };
  componentDidUpdate = (prevProps) => {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      if (this.props.location.pathname === '/') {
        this.wrapper.animate([{ height: '20vh' }, { height: '70vh' }], {
          duration: 300,
          fill: 'forwards',
          easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
          iterations: 1,
        });
      } else {
        this.wrapper.animate([{ height: '70vh' }, { height: '20vh' }], {
          duration: 300,
          fill: 'forwards',
          easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
          iterations: 1,
        });
      }
    }
  };

  render() {
    const { title, data, location } = this.props;
    return (
      <HeaderWrapper
        isHome={location.pathname === '/'}
        ref={(wrapper) => {
          /* eslint-disable react/no-find-dom-node */
          this.wrapper = ReactDOM.findDOMNode(wrapper);
          /* eslint-enable react/no-find-dom-node */
        }}
      >
        <HeaderContainer>
          <LogoLink to="/">
            <Logo image={data.logo.sizes.src}>
              {title}
            </Logo>
          </LogoLink>
          <MainNav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </MainNav>
        </HeaderContainer>
        <Img
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 0.3,
          }}
          sizes={data.background.sizes}
        />
      </HeaderWrapper>
    );
  }
}
