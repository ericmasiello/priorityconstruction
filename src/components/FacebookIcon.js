import React from 'react';
import styled from 'styled-components';

export const FacebookIcon = props => (
  <svg viewBox="-7 8.998 38 38.004" {...props}>
    <desc>Facebook</desc>
    <path
      d="M25.919,8.998H-1.842c-2.828,0-5.121,2.293-5.121,5.121v27.762
	c0,2.828,2.292,5.121,5.121,5.121H11.85l0.023-13.58H8.345c-0.459,0-0.831-0.37-0.833-0.83l-0.017-4.377
	c-0.002-0.461,0.372-0.836,0.833-0.836h3.522v-4.23c0-4.908,2.999-7.581,7.377-7.581h3.592c0.459,0,0.832,0.372,0.832,0.832v3.692
	c0,0.459-0.373,0.832-0.832,0.832l-2.205,0.001c-2.381,0-2.842,1.132-2.842,2.794v3.66h5.232c0.499,0,0.887,0.436,0.827,0.932
	l-0.519,4.376c-0.051,0.42-0.405,0.735-0.828,0.735h-4.689l-0.023,13.58h8.146c2.828,0,5.121-2.293,5.121-5.121V14.119
	C31.04,11.291,28.747,8.998,25.919,8.998"
    />
  </svg>
);

FacebookIcon.displayName = 'FacebookIcon';

export default styled(FacebookIcon)`
  fill: #445281;
`;
