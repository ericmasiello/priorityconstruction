import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Label = (props) => {
  const { tag: Tag, ...rest } = props;
  return (
    <Tag {...rest} />
  );
};

Label.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Label.defaultProps = {
  tag: 'label',
};

Label.displayName = 'Label';

export default styled(Label)`
  display: block;
`;
