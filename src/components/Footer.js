import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pxToRem } from '../styles/utils';
import { MAX_CONTENT_WIDTH } from '../styles/vars';
import * as CustomPropTypes from '../propTypes';
import Container from './Container';

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
    children,
    ...rest
  } = props;

  return (
    <Tag {...rest}>
      <Container>{children}</Container>
    </Tag>
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
  children: PropTypes.node,
};

Footer.defaultProps = {
  tag: 'footer',
};

export default styled(Footer)`
  margin: 0 auto;
  max-width: ${pxToRem(MAX_CONTENT_WIDTH)};
  padding-top: 1.45rem;
  padding-bottom: 1.45rem;
`;