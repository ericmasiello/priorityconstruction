import { TYPE_SIZE } from '../styles/vars';
import typeComponentFactory from '../utils/typeComponentFactory';

const result = typeComponentFactory(TYPE_SIZE.small, {
  defaultTag: 'small',
  displayName: 'Small',
});

export const RawType = result.Type;

export default result.StyledType;
