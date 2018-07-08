import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Type1 from '../components/Type1';
import List from '../components/List';
import OfficeMap from '../components/OfficeMap';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';

const Contact = ({ data }) => (
  <div>
    <Type1>Contact Priority Construction</Type1>
    <p>
      Do you have a question on an ongoing project? Want us to do a specific job? {' '}
      <Link to="/careers">Looking for a place to work?</Link> Please don{'\''}t hesitate to contact us.
    </p>
    <p>
      <a
        href="https://www.google.com/maps/place/1315+W+Hamburg+St/@39.277222,-76.632891,17z/"
      >
        1315 West Hamburg Street, Baltimore, MD 21203
      </a>
    </p>

    <List>
      <List.Item>Phone: 410-244-6773</List.Item>
      <List.Item>Fax 410-244-6778</List.Item>
      <List.Item>
        <a href="mailto:info@priorityconst.com">info@priorityconst.com</a>
      </List.Item>
    </List>

    <OfficeMap mapKey={data.site.siteMetadata.googleMapKey} />

    <form name="contact" method="POST" data-netlify>
      <input type="hidden" name="form-name" value="contact" />
      <Field nameAs="name">
        <Label>Name</Label>
        <Input />
      </Field>
      <Field nameAs="company">
        <Label>Company</Label>
        <Input />
      </Field>
      <Field nameAs="phone">
        <Label>Phone</Label>
        <Input />
      </Field>
      <Field nameAs="fax">
        <Label>Fax</Label>
        <Input />
      </Field>
      <Field nameAs="email">
        <Label>Email</Label>
        <Input />
      </Field>
      <Field stack nameAs="comments">
        <Label>Additional comments</Label>
        <Textarea />
      </Field>
      <Button type="submit">Submit</Button>
    </form>
  </div>
);

Contact.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        googleMapKey: PropTypes.string,
      }),
    }),
  }).isRequired,
};

Contact.displayName = 'Contact';

export default Contact;

export const query = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        googleMapKey
      }
    }
  }
`;
