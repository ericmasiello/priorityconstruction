import styled from 'styled-components';
import ListItem from './ListItem';

const FlatListItem = styled(ListItem)`
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export default FlatListItem;
