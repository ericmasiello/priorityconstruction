import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as CustomPropTypes from '../propTypes';

export const List = ({ tag: Tag, decorated, ...rest }) => <Tag {...rest} />;

List.propTypes = {
  tag: CustomPropTypes.Tag,
  decorated: PropTypes.bool,
};

List.defaultProps = {
  tag: 'ul',
  decorated: false,
};

List.displayName = 'List';

const StyleList = styled(List)`
  margin: 0;
  padding-left: 1.5rem;

  ${({ decorated }) =>
    !decorated &&
    `
    list-style-type: none;
    padding-left: 0;
  `};
`;

StyleList.propTypes = List.propTypes;
StyleList.defaultProps = List.defaultProps;

export default StyleList;
