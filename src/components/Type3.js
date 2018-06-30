import { TYPE_SIZE } from '../styles/vars';
import typeComponentFactory from '../utils/typeComponentFactory';

const result = typeComponentFactory(TYPE_SIZE.t3, {
  defaultTag: 'h3',
  displayName: 'Type3',
});

export const Type3 = result.Type;

export default result.StyledType;
