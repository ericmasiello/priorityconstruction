import FlatList from './FlatList';
import { pxToRem } from '../styles/utils';

const HeaderBarFlatListItem = FlatList.Item.extend`
  &:not(:last-child) {
    margin-right: ${pxToRem(30)};
  }
`;

export default HeaderBarFlatListItem;
