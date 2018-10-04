import React from 'react';
import styled from 'styled-components';
import HeroBanner from './HeroBanner';
import HeroContent from './HeroContent';
import { GUTTER_SIZE } from '../styles/vars';
import { pxToRem } from '../styles/utils';

export const HeroCareersPageContent = props => (
  <HeroContent {...props}>
    <HeroBanner tag="h1">Careers Opportunities</HeroBanner>
  </HeroContent>
);

HeroCareersPageContent.displayName = 'HeroCareersPageContent';

export default styled(HeroCareersPageContent)`
  align-self: center;
  width: 100%;
  ${HeroBanner} {
    padding-left: ${pxToRem(GUTTER_SIZE)};
    padding-right: ${pxToRem(GUTTER_SIZE)};
  }
`;
