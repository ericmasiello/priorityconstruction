import React from 'react';
import styled from 'styled-components';
import Masthead from '../components/Masthead';
import HeaderBar from '../components/HeaderBar';
import FlatList from '../components/FlatList';
import Logo from '../components/Logo';
import MainNavLink from '../components/MainNavLink';
import * as CustomPropTypes from '../propTypes';
import { pxToRem } from '../styles/utils';
import LayoutContext from '../layoutContext';

export const ComposedMasthead = (props) => {
  const {
    background,
    ...rest
  } = props;
  return (
    <LayoutContext.Consumer>
      {(layout) => (
        <Masthead
          {...rest}
          bgImage={background}
          isFullHeight={layout.isFullHeight}
        >
          <HeaderBar>
            <Logo image={layout.logo} />
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
      )}
    </LayoutContext.Consumer>
  );
};

ComposedMasthead.displayName = 'ComposedMasthead';

ComposedMasthead.propTypes = {
  background: CustomPropTypes.ImageSharp.isRequired,
};

export default styled(ComposedMasthead)`
  ${FlatList.Item} {
    margin-right: ${pxToRem(30)};

    &:last-child {
      margin-right: 0;
    }
  }
`;
