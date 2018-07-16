import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import HeaderBar from './HeaderBar';
import FlatList from './FlatList';
import MenuIcon from './MenuIcon';
import Logo from './Logo';
import MainNavLink from './MainNavLink';
import { pxToRem } from '../styles/utils';
import { PAGE_SPACING, TYPE_SIZE, COLORS } from '../styles/vars';
import HeaderBarFlatListItem from './HeaderBarFlatListItem';
import * as CustomPropTypes from '../propTypes';

const InvisibleButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
`;

const HomeHeaderBarFlatListItem = HeaderBarFlatListItem.extend`
  display: none;
  @media (max-width: ${pxToRem(680)}) {
    display: block;
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
    to: '/careers',
    children: 'Careers',
  },
  {
    to: '/contact',
    children: 'Contact',
  },
];

class PageHeaderBar extends React.Component {
  propTypes = {
    navRef: PropTypes.func,
    logo: CustomPropTypes.ImageSharp,
    currentPathname: PropTypes.string,
    className: PropTypes.string,
  };

  state = { showMenu: false };

  handleShowMenu = () => {
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
    const showMenuClassName = this.state.showMenu ? 'show-menu' : '';
    return (
      <HeaderBar tag="nav" innerRef={navRef} className={className}>
        <Logo image={logo} />
        <FlatList className={showMenuClassName}>
          <HomeHeaderBarFlatListItem>
            <MainNavLink selected={currentPathname === '/'} onClick={this.handleHideMenu} to="/">
              Home
            </MainNavLink>
          </HomeHeaderBarFlatListItem>
          {links.map(link => (
            <HeaderBarFlatListItem key={link.to}>
              <MainNavLink
                selected={currentPathname === link.to}
                {...link}
                onClick={this.handleHideMenu}
              />
            </HeaderBarFlatListItem>
          ))}
        </FlatList>
        <InvisibleButton onClick={this.handleShowMenu}>
          <MenuIcon />
        </InvisibleButton>
      </HeaderBar>
    );
  }
}

// TODO: refactor these styles for mobile-first!
export default styled(PageHeaderBar)`
  ${InvisibleButton} {
    display: none;
  }

  @media (max-width: ${pxToRem(680)}) {
    position: static;

    ${FlatList} {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      height: 100vh;
      z-index: 999;
      flex-direction: column;
      padding: ${pxToRem(PAGE_SPACING.horizontal)};
      font-size: ${pxToRem(TYPE_SIZE.t4[0])};
    }

    ${FlatList}.show-menu {
      display: block;
    }

    ${HomeHeaderBarFlatListItem}, ${HeaderBarFlatListItem} {
      margin-bottom: 1rem;
    }

    // prettier-ignore
    ${HeaderBarFlatListItem}:not(:last-child) {
      margin-right: 0;
    }

    ${InvisibleButton} {
      display: block;
    }

    ${MenuIcon} {
      fill: ${COLORS.highlight3};
      width: ${pxToRem(20)};
      height: ${pxToRem(20)};
    }
  }
`;
