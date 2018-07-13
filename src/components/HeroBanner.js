import React from 'react';
import styled from 'styled-components';
import Type1 from './Type1';
import { COLORS } from '../styles/vars';

export const HeroBanner = props => <Type1 {...props} />;

HeroBanner.displayName = 'HeroBanner';

export default styled(HeroBanner)`
  position: relative;
  z-index: 2;
  color: ${COLORS.highlight};
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 0;
`;
