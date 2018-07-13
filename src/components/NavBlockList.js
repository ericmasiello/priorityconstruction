import React from 'react';
import styled from '../../node_modules/styled-components';
import * as CustomPropTypes from '../propTypes';
import { COLORS } from '../styles/vars';
import { pxToRem } from '../styles/utils';

export const NavBlockList = (props) => {
  const { tag: Tag, ...rest } = props;
  return <Tag {...rest} />;
};

NavBlockList.propTypes = {
  tag: CustomPropTypes.Tag,
};

NavBlockList.defaultProps = {
  tag: 'ul',
};

NavBlockList.displayName = 'NavBlockList';

const StyledBlockList = styled(NavBlockList)`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const NavBlockListItem = (props) => {
  const { tag: Tag, ...rest } = props;
  return <Tag {...rest} />;
};

NavBlockListItem.propTypes = {
  tag: CustomPropTypes.Tag,
};

NavBlockListItem.defaultProps = {
  tag: 'li',
};

NavBlockListItem.displayName = 'NavBlockListItem';

const StyledNavBlockListItem = styled(NavBlockListItem)`
  background-color: ${COLORS.highlight3};
  text-transform: uppercase;
  color: #fff;
  
  &:not(:last-child) {
    margin-bottom: ${pxToRem(3)};
  }

  a {
    padding: ${pxToRem(12)} ${pxToRem(16)};
    color: inherit;
    display: block;
  }
`;

StyledBlockList.Item = StyledNavBlockListItem;

export default StyledBlockList;
