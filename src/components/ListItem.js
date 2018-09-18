import React from 'react';
import styled from 'styled-components';
import * as CustomPropTypes from '../propTypes';

export const ListItem = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

ListItem.propTypes = {
  tag: CustomPropTypes.Tag,
};

ListItem.defaultProps = {
  tag: 'li',
};

ListItem.displayName = 'ListItem';

const StyleListItem = styled(ListItem)`
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export default StyleListItem;
