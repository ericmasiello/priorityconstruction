import React from 'react';
import PageContainer from '../components/PageContainer';
import Type1 from '../components/Type1';
import Type2 from '../components/Type2';
import Type3 from '../components/Type3';
import Base from '../components/Base';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';

const Careers = () => (
  <PageContainer tag="section">
    <Type1>Career Opportunities with Priority Construction</Type1>
    <p>
      Interested in working with us in the construction field? We are always looking for individuals
      who would like to develop their skills and apply them to ongoing projects we currently have.
      We are always in demand for dedicated foreman, laborers, skilled workers, mechanics, CDL
      drivers, and operators. Working outside in the construction field isn’t for you? We are also
      interested in individuals who specialize in estimating, accounting, finance, project
      management, and office management. We are not only a team at Priority Construction, we are
      also a family.
    </p>
    <Type2>Online Employment Application</Type2>
    <Base tag="h2">Solicitud de empleo en línea</Base>
    <p>
      Please fill out the online application below as completely as possible to apply for a position
      with Priority Construction. Thank you!
    </p>

    <form name="careers" method="POST" data-netlify>
      <input type="hidden" name="form-name" value="careers" />
      <fieldset>
        <Type3>Personal Information</Type3>
        <Field nameAs="name">
          <Label>Name</Label>
          <Input />
        </Field>
      </fieldset>

      <fieldset>
        <Type3>Previous Employment Experience</Type3>
      </fieldset>

      <fieldset>
        <Type3>Additional Qualifications</Type3>
      </fieldset>

      <fieldset>
        <Type3>Disclaimer and Signature</Type3>
      </fieldset>

      <Button type="submit">Submit</Button>
    </form>
  </PageContainer>
);

Careers.displayName = 'Careers';

export default Careers;
