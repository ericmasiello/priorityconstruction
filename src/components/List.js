import React from 'react';
import styled from 'styled-components';
import * as CustomPropTypes from '../propTypes';

export const List = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

List.propTypes = {
  tag: CustomPropTypes.Tag,
};

List.defaultProps = {
  tag: 'ul',
};

List.displayName = 'List';

export const ListItem = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

ListItem.propTypes = {
  tag: CustomPropTypes.Tag,
};

ListItem.defaultProps = {
  tag: 'li',
};

ListItem.displayName = 'List.Item';

const StyleList = styled(List)`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyleListItem = styled(ListItem)`
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

StyleList.Item = StyleListItem;

export default StyleList;
