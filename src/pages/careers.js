import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Type3 from '../components/Type3';
import Type5 from '../components/Type5';
import Base from '../components/Base';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';

const Careers = ({ className }) => (
  <PageContainer tag="section" className={className}>
    <p>
      Interested in working with us in the construction field? We are always looking for individuals
      who would like to develop their skills and apply them to ongoing projects we currently have.
      We are always in demand for dedicated foreman, laborers, skilled workers, mechanics, CDL
      drivers, and operators. Working outside in the construction field isn’t for you? We are also
      interested in individuals who specialize in estimating, accounting, finance, project
      management, and office management. We are not only a team at Priority Construction, we are
      also a family.
    </p>
    <Type3 tag="h2">Online Employment Application</Type3>
    <Base tag="h2">Solicitud de empleo en línea</Base>
    <p>
      Please fill out the online application below as completely as possible to apply for a position
      with Priority Construction. Thank you!
    </p>

    <form name="careers" method="POST" data-netlify>
      <input type="hidden" name="form-name" value="careers" />
      <fieldset>
        <Type5>Personal Information</Type5>
        <Field nameAs="name">
          <Label>Name</Label>
          <Input />
        </Field>
      </fieldset>

      <fieldset style={{ display: 'none' }}>
        <Type5>Previous Employment Experience</Type5>
      </fieldset>

      <fieldset style={{ display: 'none' }}>
        <Type5>Additional Qualifications</Type5>
      </fieldset>

      <fieldset style={{ display: 'none' }}>
        <Type5>Disclaimer and Signature</Type5>
      </fieldset>

      <Button type="submit">Submit</Button>
    </form>
  </PageContainer>
);

Careers.displayName = 'Careers';

Careers.propTypes = {
  className: PropTypes.string,
};

export default styled(Careers)`
  padding-top: 2rem;
`;
