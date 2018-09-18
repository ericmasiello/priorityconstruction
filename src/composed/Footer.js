import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link';
import Footer from '../components/Footer';
import List from '../components/List';
import Logo from '../components/Logo';
import FacebookIcon from '../components/FacebookIcon';
import LinkedInIcon from '../components/LinkedInIcon';
import * as CustomPropTypes from '../propTypes';
import { pxToRem } from '../styles/utils';
import { COLORS, TYPE_SIZE } from '../styles/vars';

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
            <a href="https://www.google.com/maps/place/1315+W+Hamburg+St,+Baltimore,+MD+21230/">
              <List>
                <List.Item>
                  {streetAddress} 
                  {' '}
                  {city}
, 
                  {' '}
                  {state} 
                  {' '}
                  {zip}
                </List.Item>
              </List>
            </a>
            <List>
              <List.Item>
                <a href={`tel:${phone}`}>
                  phone:
                  {phone}
                </a>
              </List.Item>
              <List.Item>
                <a href={`tel:${fax}`}>
                  fax
                  {fax}
                </a>
              </List.Item>
            </List>
            <List>
              <List.Item>
                <a href={`mailto:${email}`}>{email}</a>
              </List.Item>
              <List.Item>
                <Link to="/contact">Contact Us</Link>
              </List.Item>
              <List.Item>
                <Link to="/careers">Career Opportunities</Link>
              </List.Item>
            </List>
          </Address>
        </div>
        <div>
          <SocialMedia>
            <a href="https://www.facebook.com/prorityconstruction/" title="Facebook page">
              <FacebookIcon />
            </a>
            <a href="https://www.linkedin.com/company/priority-construction/" title="LinkedIn Page">
              <LinkedInIcon />
            </a>
          </SocialMedia>
        </div>
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

export default styled(ComposedFooter)`
  font-size: ${pxToRem(TYPE_SIZE.small[0])};
  line-height: ${TYPE_SIZE.small[1]};
`;
