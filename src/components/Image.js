import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Image = ({ tag: Tag, ...rest }) => <Tag {...rest} />;

Image.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Image.defaultProps = {
  tag: 'img',
};

Image.displayName = 'Image';

export default styled(Image)`
  max-width: 100%;
`;
