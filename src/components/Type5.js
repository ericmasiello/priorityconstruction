import { TYPE_SIZE } from '../styles/vars';
import typeComponentFactory from '../utils/typeComponentFactory';

const result = typeComponentFactory(TYPE_SIZE.t5, {
  defaultTag: 'h5',
  displayName: 'Type5',
});

export const Type5 = result.Type;

export default result.StyledType;
