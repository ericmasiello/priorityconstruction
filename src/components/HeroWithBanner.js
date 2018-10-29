import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HeroContent from './HeroContent';
import Type2 from './Type2';
import Type4 from './Type4';
import { GUTTER_SIZE } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import { Tag as TagType } from '../propTypes';

const Content = styled.hgroup`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: ${pxToRem(GUTTER_SIZE)};
  padding-right: ${pxToRem(GUTTER_SIZE)};
  width: 100%;
  min-height: ${pxToRem(140)};
  height: 33%;
  padding-bottom: 2rem;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding-top: 1rem;
  text-transform: uppercase;
  font-weight: 400;

  ${Type2}, ${Type4} {
    margin-bottom: 0;
  }
`;

const HeroWithBanner = ({ title, subtitle, tag: Tag, ...rest }) => (
  <Tag {...rest}>
    <Content>
      <Type2 tag="h1">{title}</Type2>
      {subtitle && <Type4 tag="h2">{subtitle}</Type4>}
    </Content>
  </Tag>
);

HeroWithBanner.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  tag: TagType,
};

HeroWithBanner.defaultProps = {
  tag: HeroContent,
};

HeroWithBanner.displayName = 'HeroWithBanner';

export default styled(HeroWithBanner)`
  height: 100%;
  display: flex;
  align-items: flex-end;
  position: relative;
  z-index: 2;
`;
