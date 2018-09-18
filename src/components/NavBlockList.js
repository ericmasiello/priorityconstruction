import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as CustomPropTypes from '../propTypes';

export const NavBlockList = props => {
  const { tag: Tag, row, ...rest } = props;
  return <Tag {...rest} />;
};

NavBlockList.propTypes = {
  tag: CustomPropTypes.Tag,
};

NavBlockList.defaultProps = {
  tag: 'ul',
};

NavBlockList.displayName = 'NavBlockList';

NavBlockList.propTypes = {
  row: PropTypes.bool,
};

export default styled(NavBlockList)`
  list-style-type: none;
  padding: 0;
  margin: 0;
  ${({ row }) => {
    if (row) {
      return `
        display: flex;
        
        > * {
          margin-bottom: 0;
        }
      `;
    }
    return '';
  }};
`;
