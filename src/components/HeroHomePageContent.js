import React from 'react';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';
import Link from 'gatsby-link';
import Type3 from './Type3';
import Type4 from './Type4';
import Button from './Button';
import ContentWrapper from './ContentWrapper';
import HeroContent from './HeroContent';
import { GUTTER_SIZE, COLORS, MEDIA_QUERIES } from '../styles/vars';
import { pxToRem } from '../styles/utils';

const HGroup = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background-color: ${tinyColor(COLORS.brand[0])
    .setAlpha(0.9)
    .toRgbString()};
  margin: 0;
  height: calc(100% + ${pxToRem(GUTTER_SIZE * 2)});
  padding: ${pxToRem(GUTTER_SIZE)};

  @media (min-width: ${pxToRem(MEDIA_QUERIES.heroL)}) {
    width: 75%;
  }

  @media (min-width: ${pxToRem(MEDIA_QUERIES.heroXL)}) {
    width: 50%;
  }

  @media (min-width: ${pxToRem(MEDIA_QUERIES.fullBleed)}) {
    width: calc(50% + ${pxToRem(GUTTER_SIZE)});
    margin-right: ${pxToRem(GUTTER_SIZE * -1)};
  }
`;

export const HeroHomePageContent = props => (
  <HeroContent {...props}>
    <HGroup tag="hgroup">
      <Type3 tag="h1">Bringing Concrete Ideas to Life</Type3>
      <Type4 tag="p">Quality workmanship & excellent customer service</Type4>
      <Button color="light" large tag={Link} to="/quote">
        Get a quote
      </Button>
    </HGroup>
  </HeroContent>
);

HeroHomePageContent.displayName = 'HeroHomePageContent';

export default styled(HeroHomePageContent)`
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: flex-end;

  ${Type3} {
    text-transform: uppercase;
    margin-bottom: 0;
  }

  ${Type3}, ${Type4} {
    text-shadow: 0 0 2px
      ${tinyColor(COLORS.highlight)
        .darken(30)
        .toRgbString()};
  }
`;
