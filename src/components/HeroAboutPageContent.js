import React from 'react';
import styled from 'styled-components';
import HeroBanner from './HeroBanner';
import HeroContent from './HeroContent';
import { PAGE_SPACING } from '../styles/vars';
import { pxToRem } from '../styles/utils';

export const HeroAboutPageContent = props => (
  <HeroContent {...props}>
    <HeroBanner tag="h1">About Us</HeroBanner>
  </HeroContent>
);

HeroAboutPageContent.displayName = 'HeroAboutPageContent';

export default styled(HeroAboutPageContent)`
  align-self: center;
  width: 100%;
  ${HeroBanner} {
    padding-left: ${pxToRem(PAGE_SPACING.horizontal)};
    padding-right: ${pxToRem(PAGE_SPACING.horizontal)};
  }
`;
