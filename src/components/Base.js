import { TYPE_SIZE } from '../styles/vars';
import typeComponentFactory from '../utils/typeComponentFactory';

const result = typeComponentFactory(TYPE_SIZE.base, {
  defaultTag: 'span',
  displayName: 'Base',
});

export const Base = result.Type;

export default result.StyledType;
