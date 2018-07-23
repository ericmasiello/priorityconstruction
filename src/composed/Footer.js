import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Footer from '../components/Footer';
import List from '../components/List';
import Logo from '../components/Logo';
import FacebookIcon from '../components/FacebookIcon';
import LinkedInIcon from '../components/LinkedInIcon';
import * as CustomPropTypes from '../propTypes';
import { pxToRem } from '../styles/utils';
import { COLORS } from '../styles/vars';

const Container = styled.div`
  @media (min-width: ${pxToRem(650)}) {
    display: flex;
    justify-content: space-between;
  }

  ${Logo} {
    margin-bottom: ${pxToRem(8)};
  }
`;

const Address = styled.address`
  margin-bottom: 1rem;

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

const SocialMedia = styled.aside`
  display: flex;

  > * {
    margin-right: 0.5rem;
  }

  ${FacebookIcon}, ${LinkedInIcon} {
    width: ${pxToRem(40)};
    height: ${pxToRem(40)};
  }
`;

export const ComposedFooter = props => {
  const { logo, streetAddress, city, state, zip, phone, fax, email, ...rest } = props;
  return (
    <Footer {...rest}>
      <Container>
        <div>
          <Logo image={logo} />
          <Address>
            <List>
              <List.Item>{streetAddress}</List.Item>
              <List.Item>
                {city}, {state} {zip}
              </List.Item>
            </List>
            <List>
              <List.Item>phone: {phone}</List.Item>
              <List.Item>fax {fax}</List.Item>
            </List>
            <a href={`mailto:${email}`}>{email}</a>
          </Address>
        </div>
        <SocialMedia>
          <a href="https://www.facebook.com/prorityconstruction/" title="Facebook page">
            <FacebookIcon />
          </a>
          <a href="https://www.linkedin.com/company/priority-construction/" title="LinkedIn Page">
            <LinkedInIcon />
          </a>
        </SocialMedia>
      </Container>
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

export default styled(ComposedFooter)``;
