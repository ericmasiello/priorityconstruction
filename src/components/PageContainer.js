import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pxToRem } from '../styles/utils';
import { GUTTER_SIZE } from '../styles/vars';
import * as CustomPropTypes from '../propTypes';
import Container from './Container';

export const PageContainer = props => {
  const { tag: Tag, children, plus, ...rest } = props;
  return (
    <Tag {...rest} data-page-container>
      <Container plus={plus}>{children}</Container>
    </Tag>
  );
};

PageContainer.propTypes = {
  tag: CustomPropTypes.Tag,
  plus: PropTypes.bool,
  children: PropTypes.node,
};

PageContainer.defaultProps = {
  tag: 'div',
  plus: false,
};

PageContainer.displayName = 'PageContainer';

export default styled(PageContainer)`
  padding: 0 ${pxToRem(GUTTER_SIZE)} 1rem;
`;
