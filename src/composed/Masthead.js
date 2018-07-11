import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Masthead from '../components/Masthead';
import HeaderBar from '../components/HeaderBar';
import FlatList from '../components/FlatList';
import Logo from '../components/Logo';
import MainNavLink from '../components/MainNavLink';
import * as CustomPropTypes from '../propTypes';
import { pxToRem } from '../styles/utils';

export const ComposedMasthead = (props) => {
  const {
    background,
    isFullHeight,
    logo,
    ...rest
  } = props;
  return (
    <Masthead
      {...rest}
      bgImage={background}
      isFullHeight={isFullHeight}
    >
      <HeaderBar>
        <Logo image={logo} />
        <nav>
          <FlatList>
            <FlatList.Item>
              <MainNavLink to="/services">Services</MainNavLink>
            </FlatList.Item>
            <FlatList.Item>
              <MainNavLink to="/about">About</MainNavLink>
            </FlatList.Item>
            <FlatList.Item>
              <MainNavLink to="/careers">Careers</MainNavLink>
            </FlatList.Item>
            <FlatList.Item>
              <MainNavLink to="/contact">Contact</MainNavLink>
            </FlatList.Item>
          </FlatList>
        </nav>
      </HeaderBar>
    </Masthead>
  );
};

ComposedMasthead.displayName = 'ComposedMasthead';

ComposedMasthead.propTypes = {
  logo: CustomPropTypes.ImageSharp.isRequired,
  background: CustomPropTypes.ImageSharp.isRequired,
  isFullHeight: PropTypes.bool,
};

export default styled(ComposedMasthead)`
  ${FlatList.Item} {
    margin-right: ${pxToRem(30)};

    &:last-child {
      margin-right: 0;
    }
  }
`;
