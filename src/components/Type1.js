import { TYPE_SIZE } from '../styles/vars';
import typeComponentFactory from '../utils/typeComponentFactory';

const result = typeComponentFactory(TYPE_SIZE.t1, {
  defaultTag: 'h1',
  displayName: 'Type1',
});

export const Type1 = result.Type;

export default result.StyledType;
