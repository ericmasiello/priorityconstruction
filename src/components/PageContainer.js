import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pxToRem } from '../styles/utils';
import { PAGE_SPACING } from '../styles/vars';
import * as CustomPropTypes from '../propTypes';
import Container from './Container';

export const PageContainer = props => {
  const { tag: Tag, children, ...rest } = props;
  return (
    <Tag {...rest}>
      <Container>{children}</Container>
    </Tag>
  );
};

PageContainer.propTypes = {
  tag: CustomPropTypes.Tag,
  children: PropTypes.node,
};

PageContainer.defaultProps = {
  tag: 'div',
};

PageContainer.displayName = 'PageContainer';

export default styled(PageContainer)`
  padding: 0 ${pxToRem(PAGE_SPACING.horizontal)} 1rem;
`;
