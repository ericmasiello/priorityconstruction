import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pxToRem } from '../styles/utils';
import { COLORS, MAX_CONTENT_WIDTH } from '../styles/vars';
import { TagPropType } from '../propTypes';

const HeaderBarContent = styled.div`
  margin: 0 auto;
  max-width: ${pxToRem(MAX_CONTENT_WIDTH)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderBar = (props) => {
  const { tag: Tag, children, ...rest } = props;
  return (
    <Tag {...rest}>
      <HeaderBarContent>
        {children}
      </HeaderBarContent>
    </Tag>
  );
};

HeaderBar.displayName = 'HeaderBar';

HeaderBar.propTypes = {
  tag: TagPropType,
  children: PropTypes.node,
};

HeaderBar.defaultProps = {
  tag: 'header',
};

export default styled(HeaderBar)`
  background-color: ${COLORS.bg};
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
`;
