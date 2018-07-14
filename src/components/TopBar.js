import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentWrapper from './ContentWrapper';
import { COLORS, PAGE_SPACING } from '../styles/vars';
import { pxToRem } from '../styles/utils';
import * as CustomPropTypes from '../propTypes';

const TopBarContent = ContentWrapper.extend`
  display: flex;
  justify-content: flex-end;
`;

export const TopBar = ({ tag: Tag, children, ...rest }) => (
  <Tag {...rest}>
    <TopBarContent>{children}</TopBarContent>
  </Tag>
);

TopBar.displayName = 'TopBar';

TopBar.propTypes = {
  tag: CustomPropTypes.Tag,
  children: PropTypes.node,
};

TopBar.defaultProps = {
  tag: 'div',
};

export default styled(TopBar)`
  display: none;
  background-color: ${COLORS.highlight};
  padding: ${pxToRem(8)} ${pxToRem(PAGE_SPACING.horizontal)};

  @media (min-width: ${pxToRem(450)}) {
    display: block;
  }
`;
