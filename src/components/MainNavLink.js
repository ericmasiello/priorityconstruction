import Link from 'gatsby-link';
import styled from 'styled-components';

const MainNavLink = styled(Link)`
  text-transform: uppercase;
  &:hover {
    border-bottom: 3px solid #524763;
  }
`;

MainNavLink.displayName = 'styled(MainNavLink)';

export default MainNavLink;
