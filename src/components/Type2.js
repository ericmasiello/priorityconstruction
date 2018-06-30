import { TYPE_SIZE } from '../styles/vars';
import typeComponentFactory from '../utils/typeComponentFactory';

const result = typeComponentFactory(TYPE_SIZE.t2, {
  defaultTag: 'h2',
  displayName: 'Type2',
});

export const Type2 = result.Type;

export default result.StyledType;
