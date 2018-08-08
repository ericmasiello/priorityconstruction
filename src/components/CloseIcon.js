import React from 'react';
import styled from 'styled-components';

export const CloseIcon = props => (
  <svg viewBox="-6.125 9.875 13.25 13.25" {...props}>
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M-5.102,22.12L6.102,10.916
	"
    />
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.102,22.12L-5.102,10.916
	"
    />
  </svg>
);

CloseIcon.displayName = 'CloseIcon';

export default styled(CloseIcon)``;
