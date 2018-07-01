import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { pxToRem } from '../styles/utils';

export const PageContainer = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

PageContainer.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

PageContainer.defaultProps = {
  tag: 'div',
};

PageContainer.displayName = 'PageContainer';

export default styled(PageContainer)`
  margin: 0 auto;
  max-width: ${pxToRem(960)};
  padding: 0px 1.0875rem 1.45rem;
`;
