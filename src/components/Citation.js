import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Citation = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

Citation.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Citation.defaultProps = {
  tag: 'footer',
};

Citation.displayName = 'Citation';

export default styled(Citation)``;
