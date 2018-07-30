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
import Small from '../components/Small';
import { encode } from '../utils/form';
import { pxToRem } from '../styles/utils';

const Grid = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-gap: 1rem;

  ${Button} {
    grid-column: span 2;
  }

  @media (min-width: ${pxToRem(960)}) {
    grid-template-columns: 1fr ${pxToRem(450)};

    ${Button} {
      grid-column: span 1;
    }
  }
`;

const ContactForm = styled.form`
  display: grid;
  grid-template-columns: ${pxToRem(150)} 1fr;
  grid-gap: 1rem;

  ${Textarea} {
    min-height: ${pxToRem(250)};
  }
`;

const FORM_NAME = 'contact';

class Contact extends React.Component {
  constructor(...args) {
    super(...args);

    this.handleChangeName = this.handleChange('name');
    this.handleChangeCompany = this.handleChange('company');
    this.handleChangePhone = this.handleChange('phone');
    this.handleChangeFax = this.handleChange('fax');
    this.handleChangeEmail = this.handleChange('email');
    this.handleChangeComments = this.handleChange('comments');
  }

  state = {
    name: '',
    company: '',
    phone: '',
    fax: '',
    email: '',
    comments: '',
  };

  handleChange = key => event => {
    this.setState({
      [key]: event.target.value,
    });
  };

  handleSubmit = e => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': FORM_NAME, ...this.state }),
    })
      .then(() => alert('Success!'))
      .catch(error => alert(error));

    e.preventDefault();
  };

  render() {
    const { data, className } = this.props;

    return (
      <PageContainer tag="section" className={className}>
        <p>
          Do you have a question on an ongoing project? Want us to do a specific job?{' '}
          <Link to="/careers">Looking for a place to work?</Link> Please don{"'"}t hesitate to
          contact us.
        </p>
        <Grid>
          <ContactForm onSubmit={this.handleSubmit} name={FORM_NAME} method="POST" data-netlify>
            <input type="hidden" name="form-name" value={FORM_NAME} />
            <Field nameAs="name" fragment>
              <Label>Name</Label>
              <Input value={this.state.name} onChange={this.handleChangeName} required />
            </Field>
            <Field nameAs="company" fragment>
              <Label>Company</Label>
              <Input value={this.state.company} onChange={this.handleChangeCompany} />
            </Field>
            <Field nameAs="phone" fragment>
              <Label>Phone</Label>
              <Input
                value={this.state.phone}
                onChange={this.handleChangePhone}
                type="tel"
                placeholder="123-456-7890"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
            </Field>
            <Field nameAs="fax" fragment>
              <Label>Fax</Label>
              <Input
                value={this.state.fax}
                onChange={this.handleChangeFax}
                type="tel"
                placeholder="123-456-7890"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              />
            </Field>
            <Field nameAs="email" fragment>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                onChange={this.handleChangeEmail}
                type="email"
                required
              />
            </Field>
            <Field stack nameAs="comments" fragment>
              <Label>Additional comments</Label>
              <Textarea value={this.state.comments} onChange={this.handleChangeComments} required />
            </Field>
            <Button type="submit">Submit</Button>
          </ContactForm>
          <div>
            <OfficeMap width="100%" mapKey={data.site.siteMetadata.googleMapKey} />
            <p>
              <a href="https://www.google.com/maps/place/1315+W+Hamburg+St/@39.277222,-76.632891,17z/">
                <Small>1315 West Hamburg Street, Baltimore, MD 21203</Small>
              </a>
            </p>
          </div>
        </Grid>
      </PageContainer>
    );
  }
}

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
