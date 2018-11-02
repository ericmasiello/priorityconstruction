import React from 'react';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';
import HeroContent from './HeroContent';
import { GUTTER_SIZE, COLORS, MEDIA_QUERIES, MAX_CONTENT_WIDTH } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import * as CustomPropTypes from '../propTypes';

const ContentWrapper = ({ tag: Tag, ...props }) => <Tag {...props} />;

ContentWrapper.propTypes = {
  tag: CustomPropTypes.Tag,
};

ContentWrapper.defaultProps = {
  tag: 'div',
};

ContentWrapper.displayName = 'ContentWrapper';

const StyledContentWrapper = styled(ContentWrapper)`
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

export const HeroHomePageContent = ({ innerTag, innerClassName, children, ...rest }) => (
  <HeroContent {...rest}>
    <StyledContentWrapper tag={innerTag} className={innerClassName}>
      {children}
    </StyledContentWrapper>
  </HeroContent>
);

HeroHomePageContent.displayName = 'HeroHomePageContent';

export default styled(HeroHomePageContent)`
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: flex-end;
`;
