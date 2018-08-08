import React from 'react';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';
import Link from 'gatsby-link';
import Type2 from './Type2';
import Type4 from './Type4';
import Button from './Button';
import ContentWrapper from './ContentWrapper';
import HeroContent from './HeroContent';
import { PAGE_SPACING, COLORS } from '../styles/vars';
import { pxToRem } from '../styles/utils';

export const HeroHomePageContent = props => (
  <HeroContent {...props}>
    <ContentWrapper tag="hgroup">
      <Type2 tag="h1">Bringing Concrete Ideas to Life</Type2>
      <Type4 tag="p">Quality workmanship & excellent customer service</Type4>
      <Button color="light" large tag={Link} to="/quote">
        Get a quote
      </Button>
    </ContentWrapper>
  </HeroContent>
);

HeroHomePageContent.displayName = 'HeroHomePageContent';

export default styled(HeroHomePageContent)`
  padding-left: ${pxToRem(PAGE_SPACING.horizontal)};
  padding-right: ${pxToRem(PAGE_SPACING.horizontal)};
  padding-bottom: 15vh;
  color: ${COLORS.highlight};
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;

  ${ContentWrapper} {
    width: 100%;
  }

  ${Type2} {
    text-transform: uppercase;
    margin-bottom: 0;
  }

  ${Type2}, ${Type4} {
    text-shadow: 0 0 2px
      ${tinyColor(COLORS.highlight)
        .darken(30)
        .toRgbString()};
  }
`;
