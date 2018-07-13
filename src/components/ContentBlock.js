import React from 'react';
import styled from '../../node_modules/styled-components';
import * as CustomPropTypes from '../propTypes';
import { COLORS } from '../styles/vars';
import { pxToRem } from '../styles/utils';

export const ContentBlock = (props) => {
  const { tag: Tag, ...rest } = props;
  return <Tag {...rest} />;
};

ContentBlock.propTypes = {
  tag: CustomPropTypes.Tag,
};

ContentBlock.defaultProps = {
  tag: 'div',
};

ContentBlock.displayName = 'ContentBlock';

export default styled(ContentBlock)`
  border-left: 1px solid ${COLORS.highlight2};
  padding-left: ${pxToRem(20)};
`;
