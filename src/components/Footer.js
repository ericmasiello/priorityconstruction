import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pxToRem } from '../styles/utils';
import { MAX_CONTENT_WIDTH } from '../styles/vars';
import * as CustomPropTypes from '../propTypes';

export const Footer = (props) => {
  const {
    tag: Tag,
    streetAddress,
    city,
    state,
    zip,
    phone,
    fax,
    email,
    ...rest
  } = props;

  return (
    <Tag {...rest} />
  );
};

Footer.propTypes = {
  tag: CustomPropTypes.Tag,
  streetAddress: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.number,
  phone: PropTypes.string,
  fax: PropTypes.string,
  email: PropTypes.string,
};

Footer.defaultProps = {
  tag: 'footer',
};

export default styled(Footer)`
  margin: 0 auto;
  max-width: ${pxToRem(MAX_CONTENT_WIDTH)};
  padding: 1.45rem 1.0875rem;
`;
