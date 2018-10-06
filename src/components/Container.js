import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MAX_CONTENT_WIDTH, MAX_CONTENT_WIDTH_PLUS } from '../styles/vars';
import * as CustomPropTypes from '../propTypes';
import { pxToRem } from '../styles/utils';

export const Container = ({ tag: Tag, plus, ...rest }) => <Tag {...rest} />;

Container.propTypes = {
  tag: CustomPropTypes.Tag,
  plus: PropTypes.bool,
};

Container.defaultProps = {
  tag: 'div',
  plus: false,
};

export default styled(Container)`
  margin-left: auto;
  margin-right: auto;
  max-width: ${props => {
    if (props.plus) {
      return pxToRem(MAX_CONTENT_WIDTH_PLUS);
    }
    return pxToRem(MAX_CONTENT_WIDTH);
  }};
`;
