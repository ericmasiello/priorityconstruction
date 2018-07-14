import React from 'react';
import styled from 'styled-components';
import * as CustomPropTypes from '../propTypes';

export const HeroContent = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

HeroContent.propTypes = {
  tag: CustomPropTypes.Tag,
};

HeroContent.defaultProps = {
  tag: 'div',
};

HeroContent.displayName = 'HeroContent';

export default styled(HeroContent)`
  position: relative;
  z-index: 2;
`;
