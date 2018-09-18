import styled from 'styled-components';
import List from './List';

const FlatList = styled(List)`
  display: flex;
`;

FlatList.Item = styled(List.Item)`
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export default FlatList;
