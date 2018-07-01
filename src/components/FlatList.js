import styled from 'styled-components';
import List, { ListItem } from './List';

const FlatList = styled(List)`
  display: flex;
`;

FlatList.Item = styled(ListItem)`
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export default FlatList;
