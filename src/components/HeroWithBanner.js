import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HeroBanner from './HeroBanner';
import HeroContent from './HeroContent';
import { GUTTER_SIZE } from '../styles/vars';
import { pxToRem } from '../styles/utils';

const HeroWithBanner = ({ title, ...rest }) => (
  <HeroContent {...rest}>
    <HeroBanner tag="h1">{title}</HeroBanner>
  </HeroContent>
);

HeroWithBanner.propTypes = {
  title: PropTypes.node,
};

HeroWithBanner.displayName = 'HeroWithBanner';

export default styled(HeroWithBanner)`
  height: 100%;
  display: flex;
  align-items: flex-end;
  position: relative;
  z-index: 2;

  ${HeroBanner} {
    padding-left: ${pxToRem(GUTTER_SIZE)};
    padding-right: ${pxToRem(GUTTER_SIZE)};
    width: 100%;
    min-height: ${pxToRem(140)};
    height: 33%;
    display: flex;
    align-items: center;
  }
`;
