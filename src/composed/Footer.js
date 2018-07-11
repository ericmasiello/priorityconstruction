import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Footer from '../components/Footer';
import List from '../components/List';
import Logo from '../components/Logo';
import * as CustomPropTypes from '../propTypes';
import { pxToRem } from '../styles/utils';
import { COLORS } from '../styles/vars';


export const ComposedFooter = (props) => {
  const {
    logo,
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
    <Footer {...rest}>
      <Logo image={logo} />
      <address>
        <List>
          <List.Item>{streetAddress}</List.Item>
          <List.Item>{city}, {state} {zip}</List.Item>
        </List>
        <List>
          <List.Item>phone: {phone}</List.Item>
          <List.Item>fax {fax}</List.Item>
        </List>
        <a href={`mailto:${email}`}>{email}</a>
      </address>
    </Footer>
  );
};

ComposedFooter.displayName = 'ComposedFooter';

ComposedFooter.propTypes = {
  logo: CustomPropTypes.ImageSharp.isRequired,
  streetAddress: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zip: PropTypes.number.isRequired,
  phone: PropTypes.string.isRequired,
  fax: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default styled(ComposedFooter)`
  ${Logo} {
    margin-bottom: ${pxToRem(8)};
  }

  ${List} {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: ${pxToRem(4)};
  }

  ${List.Item} {
    margin-bottom: 0;
  }

  ${List.Item} {
    border-left: 1px solid ${COLORS.base};
    padding-left: ${pxToRem(8)};
    padding-right: ${pxToRem(8)};
  }

  ${List.Item}:first-child {
    padding-left: 0;
    border-left: none;
  }

  ${List.Item}:last-child {
    padding-right: 0;
  }
`;
