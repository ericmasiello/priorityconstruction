import { TYPE_SIZE } from '../styles/vars';
import typeComponentFactory from '../utils/typeComponentFactory';

const result = typeComponentFactory(TYPE_SIZE.t4, {
  defaultTag: 'h4',
  displayName: 'Type4',
});

export const Type4 = result.Type;

export default result.StyledType;
