import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';
import Link from 'gatsby-link';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Container from '../components/Container';
import { pxToRem } from '../styles/utils';
import { COLORS, TYPE_SIZE, GUTTER_SIZE } from '../styles/vars';
import * as CustomPropTypes from '../propTypes';

const BackgroundContainer = styled(Container)`
  padding: ${pxToRem(40)} ${pxToRem(GUTTER_SIZE)};
  background-color: ${tinyColor(COLORS.brand[0])
    .setAlpha(0.9)
    .toRgbString()};

  &,
  a {
    color: #fff;
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
    padding-right: ${pxToRem(8)};

    &:not(:last-child)::after {
      content: '·';
      display: inline-block;
      padding-left: 0.5rem;
    }
  }

  ${ListItem}:last-child {
    padding-right: 0;
  }
`;

export const ComposedFooter = props => {
  const { tag: Tag, streetAddress, city, state, zip, phone, ...rest } = props;
  return (
    <Tag {...rest}>
      <BackgroundContainer>
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
      </BackgroundContainer>
    </Tag>
  );
};

ComposedFooter.displayName = 'ComposedFooter';

ComposedFooter.propTypes = {
  tag: CustomPropTypes.Tag,
  streetAddress: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zip: PropTypes.number.isRequired,
  phone: PropTypes.string.isRequired,
};

ComposedFooter.defaultProps = {
  tag: 'footer',
};

export default styled(ComposedFooter)`
  font-size: ${pxToRem(TYPE_SIZE.small[0])};
  line-height: ${TYPE_SIZE.small[1]};

  ${Address} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ${List} {
    display: inline-flex;
  }
`;
