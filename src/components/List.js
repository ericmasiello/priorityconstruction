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

const StyleList = styled(List)`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export default StyleList;
