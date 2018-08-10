import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import HeaderBar from './HeaderBar';
import FlatList from './FlatList';
import MenuIcon from './MenuIcon';
import CloseIcon from './CloseIcon';
import Logo from './Logo';
import MainNavLink from './MainNavLink';
import { pxToRem } from '../styles/utils';
import { PAGE_SPACING, TYPE_SIZE, COLORS, MEDIA_QUERIES } from '../styles/vars';
import HeaderBarFlatListItem from './HeaderBarFlatListItem';
import * as CustomPropTypes from '../propTypes';

const InvisibleButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
`;

const DesktopNav = FlatList.extend`
  display: none;

  @media (min-width: ${pxToRem(MEDIA_QUERIES.navTransition)}) {
    display: flex;
  }
`;

const MobileNav = FlatList.extend`
  position: absolute;
  top: 0;
  left: 0;
  right: ${pxToRem(60)};
  bottom: 0;
  background: white;
  height: 100vh;
  z-index: 999;
  flex-direction: column;
  padding: ${pxToRem(PAGE_SPACING.horizontal)};
  font-size: ${pxToRem(TYPE_SIZE.t5[0])};
  transition: transform 0.4s, box-shadow 0.4s;
  transform: translateX(0);
  box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.5);

  &[aria-hidden='true'] {
    transform: translateX(-100%);
    box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0);
  }

  @media (min-width: ${pxToRem(600)}) {
    font-size: ${pxToRem(TYPE_SIZE.t4[0])};
  }

  @media (min-width: ${pxToRem(MEDIA_QUERIES.navTransition)}) {
    display: none;
  }
`;

const links = [
  {
    to: '/placeholder',
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
    navRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    logo: CustomPropTypes.ImageSharp,
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
    const { className, navRef, logo, currentPathname } = this.props;
    return (
      <HeaderBar tag="nav" innerRef={navRef} className={className}>
        <Logo image={logo} />
        <MobileNav aria-hidden={!this.state.showMenu}>
          <HeaderBarFlatListItem>
            <div ref={this.mobileNav} tabIndex={-1} />
            <MainNavLink selected={currentPathname === '/'} onClick={this.handleHideMenu} to="/">
              Home
            </MainNavLink>
          </HeaderBarFlatListItem>
          {links.map(link => (
            <HeaderBarFlatListItem key={link.children}>
              <MainNavLink
                selected={currentPathname === link.to}
                {...link}
                onClick={this.handleHideMenu}
              />
            </HeaderBarFlatListItem>
          ))}
          <HeaderBarFlatListItem>
            <MainNavLink
              selected={currentPathname === '/careers'}
              onClick={this.handleHideMenu}
              to="/careers"
            >
              Career Opportunities
            </MainNavLink>
          </HeaderBarFlatListItem>
          <HeaderBarFlatListItem>
            <MainNavLink
              selected={currentPathname === '/contact'}
              onClick={this.handleHideMenu}
              to="/contact"
            >
              Contact Us
            </MainNavLink>
          </HeaderBarFlatListItem>
        </MobileNav>
        <InvisibleButton onClick={this.state.showMenu ? this.handleHideMenu : this.handleShowMenu}>
          {this.state.showMenu ? <CloseIcon /> : <MenuIcon />}
        </InvisibleButton>
        <DesktopNav>
          {links.map(link => (
            <HeaderBarFlatListItem key={link.children}>
              <MainNavLink
                selected={currentPathname === link.to}
                {...link}
                onClick={this.handleHideMenu}
              />
            </HeaderBarFlatListItem>
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
    fill: ${COLORS.highlight3};
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
  }

  ${CloseIcon} {
    stroke: ${COLORS.highlight3};
  }

  @media (min-width: ${pxToRem(MEDIA_QUERIES.navTransition)}) {
    ${InvisibleButton} {
      display: none;
    }
  }
`;
