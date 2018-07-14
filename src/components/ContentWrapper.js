import React from 'react';
import styled from 'styled-components';
import { pxToRem } from '../styles/utils';
import { MAX_CONTENT_WIDTH } from '../styles/vars';
import * as CustomPropTypes from '../propTypes';

export const ContentWrapper = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

ContentWrapper.displayName = 'ContentWrapper';

ContentWrapper.propTypes = {
  tag: CustomPropTypes.Tag,
};

ContentWrapper.defaultProps = {
  tag: 'div',
};

export default styled(ContentWrapper)`
  margin: 0 auto;
  max-width: ${pxToRem(MAX_CONTENT_WIDTH)};
`;
