import React from 'react';
import styled from 'styled-components';
import * as CustomPropTypes from '../propTypes';

export const InvisibleButton = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

InvisibleButton.propTypes = {
  tag: CustomPropTypes.Tag,
};

InvisibleButton.defaultProps = {
  tag: 'button',
};

InvisibleButton.displayName = 'InvisibleButton';

export default styled(InvisibleButton)`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`;
