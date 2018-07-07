import React from 'react';
import Link from 'gatsby-link';
import Type1 from '../components/Type1';
import List from '../components/List';
import OfficeMap from '../components/OfficeMap';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';

const Contact = () => (
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

    <OfficeMap />

    <form name="contact" method="POST" data-netlify>
      <input type="hidden" name="form-name" value="contact" />
      <Field>
        <Label htmlFor="name">Name</Label>
        <Input id="name" />
      </Field>
      <Field>
        <Label htmlFor="company">Company</Label>
        <Input id="company" />
      </Field>
      <Field>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="phone" />
      </Field>
      <Field>
        <Label htmlFor="fax">Fax</Label>
        <Input id="fax" type="phone" />
      </Field>
      <Field>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </Field>
      <Field stack>
        <Label htmlFor="comments">Additional comments</Label>
        <Textarea id="comments" />
      </Field>
      <Button type="submit">Submit</Button>
    </form>
  </div>
);

Contact.displayName = 'Contact';

export default Contact;
