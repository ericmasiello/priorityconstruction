import React from 'react';
import styled from 'styled-components';
import GatsbyImage from './GatsbyImage';

const ZoomImage = styled(GatsbyImage)`
  height: 100%;
  z-index: 1;
  transition: transform 3s;

  &:hover {
    transform: scale(1.15);
  }
`;

const ZoomImageWrapper = ({ className, ...rest }) => (
  <div className={className}>
    <ZoomImage {...rest} />
  </div>
);

ZoomImageWrapper.displayName = 'ZoomImageWrapper';

export default styled(ZoomImageWrapper)`
  overflow: hidden;
  height: 100%;
  width: 100%;
`;
