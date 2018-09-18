import styled from 'styled-components';
import List from './List';

const FlatListItem = styled(List.Item)`
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export default FlatListItem;
