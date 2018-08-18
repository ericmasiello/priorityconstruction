import List from './List';

const FlatList = List.extend`
  display: flex;
`;

FlatList.Item = List.Item.extend`
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export default FlatList;
