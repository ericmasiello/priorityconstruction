import React from 'react';
import styled from 'styled-components';

export const ChevronIcon = props => (
  <svg viewBox="-7.5 8.5 27 42" {...props}>
    <desc>Chevron</desc>
    <path
      d="M-0.293,9.473c-1.298-1.297-3.402-1.297-4.7,0c-1.298,1.299-1.298,3.402,0,4.701
	L9.272,28.439L-6.526,44.24c-1.298,1.297-1.298,3.401,0,4.699c0.648,0.649,1.499,0.973,2.349,0.973c0.851,0,1.701-0.323,2.351-0.973
	l20.499-20.5L-0.293,9.473z"
    />
  </svg>
);

ChevronIcon.displayName = 'ChevronIcon';

export default styled(ChevronIcon)``;
