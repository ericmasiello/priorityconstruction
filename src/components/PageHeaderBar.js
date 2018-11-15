import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import HeaderBar from './HeaderBar';
import FlatList from './FlatList';
import MenuIcon from './MenuIcon';
import CloseIcon from './CloseIcon';
import Logo from './Logo';
import MainNavLink from './MainNavLink';
import InvisibleButton from './InvisibleButton';
import { pxToRem } from '../styles/utils';
import { GUTTER_SIZE, TYPE_SIZE, COLORS, MEDIA_QUERIES } from '../styles/vars';
import FlatListItem from './FlatListItem';
const logoOriginalHeight = 45;
const logoSizeRatio = logoOriginalHeight / 197;
const logoHeight = 50;
const logoWidth = logoHeight / logoSizeRatio;
const logoMarginDelta = ((logoHeight - logoOriginalHeight) / 2) * -1;

const LogoLink = styled(Link)`
  display: inline-block;
  height: ${pxToRem(logoHeight)};
  width: ${pxToRem(logoWidth)};
  margin-top: ${pxToRem(logoMarginDelta)};
  margin-bottom: ${pxToRem(logoMarginDelta)};
  position: relative;

  &::after {
    content: none;
  }

  ${Logo} {
    display: block;
  }
`;

const SiteTitle = styled.h1`
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0;
`;

const DesktopNav = styled(FlatList)`
  display: none;

  @media (min-width: ${pxToRem(MEDIA_QUERIES.navTransition)}) {
    display: flex;
  }

  ${FlatListItem} {
    margin-bottom: 0;

    &:not(:last-child) {
      margin-right: ${pxToRem(30)};
    }
  }
`;

const MobileNav = styled(FlatList)`
  position: fixed;
  top: 0;
  left: 0;
  right: ${pxToRem(60)};
  bottom: 0;
  background: white;
  z-index: 999;
  flex-direction: column;
  padding: ${pxToRem(GUTTER_SIZE)};
  font-size: ${pxToRem(TYPE_SIZE.t4[0])};
  transition: transform 0.4s, box-shadow 0.4s;
  transform: translateX(0);
  box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.5);

  &[aria-hidden='true'] {
    transform: translateX(-100%);
    box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0);
  }

  @media (min-width: ${pxToRem(600)}) {
    font-size: ${pxToRem(TYPE_SIZE.t3[0])};
  }

  @media (min-width: ${pxToRem(MEDIA_QUERIES.navTransition)}) {
    display: none;
  }

  ${FlatListItem} {
    margin-right: 0;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

const links = [
  {
    to: '/services',
    children: 'Services',
  },
  {
    to: '/about',
    children: 'About',
  },
  {
    to: '/gallery',
    children: 'Project Gallery',
  },
  {
    to: '/quote',
    children: 'Request Quote',
  },
];

class PageHeaderBar extends React.Component {
  static propTypes = {
    currentPathname: PropTypes.string,
    className: PropTypes.string,
  };

  state = { showMenu: false };

  mobileNav = React.createRef();

  handleShowMenu = () => {
    // put focus into the mobile nav
    this.mobileNav.current.focus();
    this.setState({
      showMenu: true,
    });
  };

  handleHideMenu = () => {
    this.setState({
      showMenu: false,
    });
  };

  render() {
    const { className, currentPathname } = this.props;
    return (
      <HeaderBar tag="nav" className={className}>
        <LogoLink to="/">
          <SiteTitle>Priority Construction</SiteTitle>
          <Logo />
        </LogoLink>
        <MobileNav aria-hidden={!this.state.showMenu}>
          <FlatListItem>
            <div ref={this.mobileNav} tabIndex={-1} />
            <MainNavLink selected={currentPathname === '/'} onClick={this.handleHideMenu} to="/">
              Home
            </MainNavLink>
          </FlatListItem>
          {links.map(link => (
            <FlatListItem key={link.children}>
              <MainNavLink
                selected={currentPathname === link.to}
                {...link}
                onClick={this.handleHideMenu}
              />
            </FlatListItem>
          ))}
          <FlatListItem>
            <MainNavLink
              selected={currentPathname === '/careers'}
              onClick={this.handleHideMenu}
              to="/careers"
            >
              Career Opportunities
            </MainNavLink>
          </FlatListItem>
          <FlatListItem>
            <MainNavLink
              selected={currentPathname === '/contact'}
              onClick={this.handleHideMenu}
              to="/contact"
            >
              Contact Us
            </MainNavLink>
          </FlatListItem>
        </MobileNav>
        <InvisibleButton onClick={this.state.showMenu ? this.handleHideMenu : this.handleShowMenu}>
          {this.state.showMenu ? <CloseIcon /> : <MenuIcon />}
        </InvisibleButton>
        <DesktopNav>
          {links.map(link => (
            <FlatListItem key={link.children}>
              <MainNavLink
                selected={currentPathname === link.to}
                {...link}
                onClick={this.handleHideMenu}
              />
            </FlatListItem>
          ))}
        </DesktopNav>
      </HeaderBar>
    );
  }
}

export default styled(PageHeaderBar)`
  ${InvisibleButton} {
    display: block;
  }

  ${MenuIcon}, ${CloseIcon} {
    fill: ${COLORS.brand[3]};
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
  }

  ${CloseIcon} {
    stroke: ${COLORS.brand[3]};
  }

  @media (min-width: ${pxToRem(MEDIA_QUERIES.navTransition)}) {
    ${InvisibleButton} {
      display: none;
    }
  }
`;
