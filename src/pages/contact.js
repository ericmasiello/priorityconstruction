import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'gatsby-link';
import PageContainer from '../components/PageContainer';
import OfficeMap from '../components/OfficeMap';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 450px;
  grid-gap: 1rem;
  margin-top: 3rem;
`;

const ContactForm = styled.form`
  ${Textarea} {
    min-height: 250px;
  }
`;

const Contact = ({ data, className }) => (
  <PageContainer tag="section" className={className}>
    <p>
      Do you have a question on an ongoing project? Want us to do a specific job?{' '}
      <Link to="/careers">Looking for a place to work?</Link> Please don{"'"}t hesitate to contact
      us.
    </p>
    <Grid>
      <ContactForm name="contact" method="POST" data-netlify>
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
      </ContactForm>
      <div>
        <OfficeMap mapKey={data.site.siteMetadata.googleMapKey} />
        <p>
          <a href="https://www.google.com/maps/place/1315+W+Hamburg+St/@39.277222,-76.632891,17z/">
            1315 West Hamburg Street, Baltimore, MD 21203
          </a>
        </p>
      </div>
    </Grid>
  </PageContainer>
);

Contact.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        googleMapKey: PropTypes.string,
      }),
    }),
  }).isRequired,
  className: PropTypes.string,
};

Contact.displayName = 'Contact';

export default styled(Contact)`
  padding-top: 2rem;
`;

export const query = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        googleMapKey
      }
    }
  }
`;
