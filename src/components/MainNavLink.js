import Link from 'gatsby-link';
import styled from 'styled-components';
import { COLORS } from '../styles/vars';

const MainNavLink = styled(Link)`
  text-transform: uppercase;
  ${({ selected }) => selected && `border-bottom: 3px solid ${COLORS.highlight3}`};

  &:hover {
    border-bottom: 3px solid ${COLORS.highlight3};
  }
`;

MainNavLink.displayName = 'styled(MainNavLink)';

export default MainNavLink;
