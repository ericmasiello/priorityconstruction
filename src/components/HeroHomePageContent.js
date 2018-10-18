import React from 'react';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';
import Link from 'gatsby-link';
import Type2 from './Type2';
import Type3 from './Type3';
import Button from './Button';
import HeroContent from './HeroContent';
import { GUTTER_SIZE, COLORS, MEDIA_QUERIES, MAX_CONTENT_WIDTH } from '../styles/vars';
import { pxToRem } from '../styles/utils';

const HGroup = styled.hgroup`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  background-color: ${tinyColor(COLORS.brand[0])
    .setAlpha(0.9)
    .toRgbString()};
  margin: 0;
  height: calc(100% + ${pxToRem(GUTTER_SIZE * 2)});
  padding: ${pxToRem(GUTTER_SIZE)} ${pxToRem(GUTTER_SIZE)} ${pxToRem(GUTTER_SIZE * 3)};

  @media (min-width: ${pxToRem(MEDIA_QUERIES.heroL)}) {
    width: 75%;
    padding-left: calc((1 / 12) * 100vw);
  }

  @media (min-width: ${pxToRem(MEDIA_QUERIES.heroXL)}) {
    width: 50%;
  }

  @media (min-width: ${pxToRem(MAX_CONTENT_WIDTH)}) {
    padding-left: ${pxToRem((1 / 12) * MAX_CONTENT_WIDTH)};
  }
`;

export const HeroHomePageContent = props => (
  <HeroContent {...props}>
    <HGroup>
      <Type2 tag="h1">Bringing Concrete Ideas to Life</Type2>
      <Type3 tag="p">Quality workmanship & excellent customer service</Type3>
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

  ${Type2} {
    text-transform: uppercase;
    margin-bottom: 0;
  }

  ${Type2}, ${Type3} {
    text-shadow: 0 0 2px
      ${tinyColor(COLORS.highlight)
        .darken(30)
        .toRgbString()};
  }
`;
