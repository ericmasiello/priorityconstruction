import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { pxToRem } from '../styles/utils';

export const OfficeMap = (props) => {
  const {
    title,
    address,
    mapKey,
    ...rest
  } = props;

  return (
    <iframe
      title={title}
      src={`https://www.google.com/maps/embed/v1/place?q=${address}&key=${mapKey}`}
      {...rest}
    />
  );
};

OfficeMap.propTypes = {
  mapKey: PropTypes.string.isRequired,
  address: PropTypes.string,
  title: PropTypes.string,
};

OfficeMap.defaultProps = {
  address: '1315%20West%20Hamburg%20Street%2C%20Baltimore%2C%20MD%2021203',
  title: 'Priority Construction',
};

export default styled(OfficeMap)`
  border: none;
  width: ${pxToRem(450)};
  height: ${pxToRem(350)};
`;
