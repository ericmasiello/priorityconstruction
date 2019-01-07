import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as CustomPropTypes from '../propTypes';

const VisuallyHidden = ({ tag: Tag, hidden, ...rest }) => <Tag {...rest} />;

VisuallyHidden.propTypes = {
  tag: CustomPropTypes.Tag,
  hidden: PropTypes.bool,
};

VisuallyHidden.defaultProps = {
  tag: 'span',
};

VisuallyHidden.displayName = 'VisuallyHidden';

const StyledVisuallyHidden = styled(VisuallyHidden)`
  ${({ hidden = false }) =>
    hidden
      ? `
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  `
      : ''};
`;

export default StyledVisuallyHidden;
