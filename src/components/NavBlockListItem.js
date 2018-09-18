import React from 'react';
import styled from 'styled-components';
import * as CustomPropTypes from '../propTypes';
import { COLORS } from '../styles/vars';
import { pxToRem } from '../styles/utils';

export const NavBlockListItem = props => {
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

export default styled(NavBlockListItem)`
  background-color: ${COLORS.highlight3};
  text-transform: uppercase;
  color: #fff;
  margin-bottom: ${pxToRem(3)};

  &:last-child {
    margin-bottom: 0;
  }

  a {
    padding: ${pxToRem(12)} ${pxToRem(16)};
    color: inherit;
    display: block;
  }
`;
