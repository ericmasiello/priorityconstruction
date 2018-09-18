import styled from 'styled-components';
import FlatList from './FlatList';
import { pxToRem } from '../styles/utils';
import { MEDIA_QUERIES } from '../styles/vars';

const HeaderBarFlatListItem = styled(FlatList.Item)`
  margin-bottom: 1rem;

  @media (min-width: ${pxToRem(MEDIA_QUERIES.navTransition)}) {
    margin-bottom: 0;

    &:not(:last-child) {
      margin-right: ${pxToRem(30)};
    }
  }
`;

export default HeaderBarFlatListItem;
