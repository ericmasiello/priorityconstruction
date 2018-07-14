import React from 'react';
import styled from 'styled-components';

export const MailIcon = props => (
  <svg viewBox="2.24 2.688 11.52 7.423" {...props}>
    <path
      d="M2.496,2.688c-0.142,0-0.256,0.115-0.256,0.256v6.912c0,0.143,0.114,0.256,0.256,0.256h11.008
	c0.142,0,0.256-0.113,0.256-0.256V2.944c0-0.141-0.114-0.256-0.256-0.256H2.496z M3.188,3.2h9.625L8,7.34L3.188,3.2z M2.752,3.5
	l3.24,2.788l-3.24,2.983V3.5z M13.248,3.5v5.771l-3.24-2.983L13.248,3.5z M6.384,6.624l1.448,1.248c0.096,0.084,0.24,0.084,0.336,0
	l1.448-1.248L12.848,9.6H3.152L6.384,6.624z"
    />
  </svg>
);

MailIcon.displayName = 'MailIcon';

export default styled(MailIcon)``;
