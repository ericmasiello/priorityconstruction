import React from 'react';
import styled from 'styled-components';
import HeroBanner from './HeroBanner';
import HeroContent from './HeroContent';
import { PAGE_SPACING } from '../styles/vars';
import { pxToRem } from '../styles/utils';

export const HeroCareersPageContent = props => (
  <HeroContent {...props}>
    <HeroBanner>Careers Opportunities</HeroBanner>
  </HeroContent>
);

HeroCareersPageContent.displayName = 'HeroCareersPageContent';

export default styled(HeroCareersPageContent)`
  align-self: center;
  width: 100%;
  ${HeroBanner} {
    padding-left: ${pxToRem(PAGE_SPACING.horizontal)};
    padding-right: ${pxToRem(PAGE_SPACING.horizontal)};
  }
`;
