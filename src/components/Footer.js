import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link';
import List from './List';
import ListItem from './ListItem';
import Container from './Container';
import { pxToRem } from '../styles/utils';
import { COLORS, TYPE_SIZE, GUTTER_SIZE } from '../styles/vars';
import * as CustomPropTypes from '../propTypes';
import links from '../config/links';

const BackgroundContainer = styled(Container)`
  padding: ${pxToRem(40)} ${pxToRem(GUTTER_SIZE)};
  background-color: ${COLORS.brand[4]};

  &,
  a {
    color: #fff;

    &::after {
      background-color: rgba(255, 255, 255, 0.3);
      z-index: 0;
    }
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

export const Footer = props => {
  const { tag: Tag, streetAddress, city, state, zip, phone, ...rest } = props;
  return (
    <Tag {...rest}>
      <BackgroundContainer plus>
        <Address>
          <List>
            <ListItem>
              <a href="https://www.google.com/maps/place/1315+W+Hamburg+St,+Baltimore,+MD+21230/">
                {streetAddress} 
                {' '}
                {city}
                {', '}
                {state} 
                {' '}
                {zip}
              </a>
            </ListItem>
          </List>

          <List>
            <ListItem>
              <a href={`tel:${phone}`}>
                {'phone: '}
                {phone}
              </a>
            </ListItem>
          </List>
          <List>
            {links.filter(link => link.footer).map(link => (
              <ListItem key={link.to}>
                <Link to={link.to}>{link.children}</Link>
              </ListItem>
            ))}
          </List>
        </Address>
      </BackgroundContainer>
    </Tag>
  );
};

Footer.displayName = 'Footer';

Footer.propTypes = {
  tag: CustomPropTypes.Tag,
  streetAddress: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zip: PropTypes.number.isRequired,
  phone: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  tag: 'footer',
};

export default styled(Footer)`
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
