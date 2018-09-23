import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link';
import Footer from '../components/Footer';
import List from '../components/List';
import ListItem from '../components/ListItem';
import { pxToRem } from '../styles/utils';
import { COLORS, TYPE_SIZE } from '../styles/vars';

const Container = styled.div`
  @media (min-width: ${pxToRem(650)}) {
    display: flex;
    justify-content: space-between;
  }
`;

const Address = styled.address`
  margin-bottom: 1rem;

  ${List} {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: ${pxToRem(4)};
  }

  ${ListItem} {
    margin-bottom: 0;
    border-left: 1px solid ${COLORS.base};
    padding-left: ${pxToRem(8)};
    padding-right: ${pxToRem(8)};
  }

  ${ListItem}:first-child {
    padding-left: 0;
    border-left: none;
  }

  ${ListItem}:last-child {
    padding-right: 0;
  }
`;

export const ComposedFooter = props => {
  const { streetAddress, city, state, zip, phone, ...rest } = props;
  return (
    <Footer {...rest}>
      <Container>
        <div>
          <Address>
            <a href="https://www.google.com/maps/place/1315+W+Hamburg+St,+Baltimore,+MD+21230/">
              <List>
                <ListItem>
                  {streetAddress} 
                  {' '}
                  {city}
                  {', '}
                  {state} 
                  {' '}
                  {zip}
                </ListItem>
              </List>
            </a>
            <List>
              <ListItem>
                <a href={`tel:${phone}`}>
                  {'phone: '}
                  {phone}
                </a>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <Link to="/contact">Contact Us</Link>
              </ListItem>
              <ListItem>
                <Link to="/careers">Career Opportunities</Link>
              </ListItem>
            </List>
          </Address>
        </div>
      </Container>
    </Footer>
  );
};

ComposedFooter.displayName = 'ComposedFooter';

ComposedFooter.propTypes = {
  streetAddress: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zip: PropTypes.number.isRequired,
  phone: PropTypes.string.isRequired,
};

export default styled(ComposedFooter)`
  font-size: ${pxToRem(TYPE_SIZE.small[0])};
  line-height: ${TYPE_SIZE.small[1]};
`;
