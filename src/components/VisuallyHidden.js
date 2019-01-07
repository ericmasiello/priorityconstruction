import styled from 'styled-components';

const VisuallyHidden = styled.span`
  ${({ hidden = false }) =>
    hidden
      ? `
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  `
      : ''};
`;

export default VisuallyHidden;
