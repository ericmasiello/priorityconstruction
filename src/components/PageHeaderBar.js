import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import HeaderBar from './HeaderBar';
import FlatList from './FlatList';
import MenuIcon from './MenuIcon';
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

const HeaderBarFlatList = FlatList.extend`
  transform: translateX(-100%);
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

  &.show-menu {
    transform: translateX(0);
    box-shadow: 1px 1px 1rem rgba(0, 0, 0, 0.5);
  }

  @media (min-width: ${pxToRem(MEDIA_QUERIES.navTransition)}) {
    display: flex;
    position: static;
    background: transparent;
    height: auto;
    flex-direction: row;
    padding: 0;
    font-size: 1rem;
  }
`;

const HomeHeaderBarFlatListItem = HeaderBarFlatListItem.extend`
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
    to: '/placeholder',
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
        <HeaderBarFlatList className={showMenuClassName}>
          <HomeHeaderBarFlatListItem>
            <MainNavLink selected={currentPathname === '/'} onClick={this.handleHideMenu} to="/">
              Home
            </MainNavLink>
          </HomeHeaderBarFlatListItem>
          {links.map(link => (
            <HeaderBarFlatListItem key={link.children}>
              <MainNavLink
                selected={currentPathname === link.to}
                {...link}
                onClick={this.handleHideMenu}
              />
            </HeaderBarFlatListItem>
          ))}
        </HeaderBarFlatList>
        <InvisibleButton onClick={this.state.showMenu ? this.handleHideMenu : this.handleShowMenu}>
          <MenuIcon />
        </InvisibleButton>
      </HeaderBar>
    );
  }
}

export default styled(PageHeaderBar)`
  ${InvisibleButton} {
    display: block;
  }

  ${MenuIcon} {
    fill: ${COLORS.highlight3};
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
  }

  @media (min-width: ${pxToRem(MEDIA_QUERIES.navTransition)}) {
    ${InvisibleButton} {
      display: none;
    }
  }
`;
