import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import Type2 from '../components/Type2';
import Type4 from '../components/Type4';
import InvisibleButton from '../components/InvisibleButton';
import NetlifyFormComposer from '../components/NetlifyFormComposer';
import ErrorMessage from '../components/ErrorMessage';
import FormSuccessMessage from '../components/FormSuccessMessage';
import { pxToRem } from '../styles/utils';

const FormErrorMessage = ErrorMessage.extend`
  margin-top: 1rem;

  @media (min-width: ${pxToRem(500)}) {
    grid-column: span 2;
    margin-top: 0;
  }
`;

const AdditionalRequirements = styled.div`
  @media (min-width: ${pxToRem(500)}) {
    grid-column: span 2;
  }
`;

const PageLayout = styled.div`
  position: relative;
`;

const ContactForm = styled.form`
  display: grid;

  @media (min-width: ${pxToRem(500)}) {
    grid-template-columns: ${pxToRem(150)} 1fr;
    grid-gap: 1rem;
    align-items: start;

    ${Button} {
      grid-column: span 2;
    }
  }

  ${Textarea} {
    min-height: ${pxToRem(250)};
  }

  ${Label} {
    padding-top: ${pxToRem(6)};

    &:not(:first-of-type) {
      margin-top: 1rem;
    }

    @media (min-width: ${pxToRem(500)}) {
      &:not(:first-of-type) {
        margin-top: 0;
      }
    }
  }

  ${Button} {
    margin-top: 1rem;

    @media (min-width: ${pxToRem(500)}) {
      margin-top: 0;
    }
  }
`;

class Careers extends React.Component {
  static displayName = 'Careers';
  static propTypes = {
    className: PropTypes.string,
  };

  fields = [
    'name',
    'address',
    'homePhone',
    'cellPhone',
    'email',
    'dob',
    'beginWorkDate',
    'desiredSalary',
    'position',
    'canWorkWeekends',
    'capableOfPhysicalLabor',
    'convictedOfFelony',
    'felonyExplanation',
    'previouslyWorkedForPriority',
    'previousWorkforPriorityDetails',
    'previousEmployerCompany',
    'previousEmployerPhone',
    'previousEmployerCity',
    'previousEmployerState',
    'previousEmployerResponsibilities',
    'previousEmployerStartDate',
    'previousEmployerEndDate',
    'previousEmployerReasonForLeaving',
    'additionalQualifications',
    'signature',
    'date',
  ];

  thankYouMessage = React.createRef();
  errorMessage = React.createRef();

  handleSetThankYouFocus = () => {
    this.thankYouMessage.current.focus();
  };

  handleSetErrorFocus = () => {
    this.errorMessage.current.focus();
  };

  render() {
    const { className } = this.props;
    return (
      <PageContainer tag="section" className={className}>
        {/* TODO: move this text to markdown */}
        <p>
          Interested in working with us in the construction field? We are always looking for
          individuals who would like to develop their skills and apply them to ongoing projects we
          currently have. We are always in demand for dedicated foreman, laborers, skilled workers,
          mechanics, CDL drivers, and operators. Working outside in the construction field isn’t for
          you? We are also interested in individuals who specialize in estimating, accounting,
          finance, project management, and office management. We are not only a team at Priority
          Construction, we are also a family.
        </p>
        <PageLayout>
          <NetlifyFormComposer
            name="careers"
            fields={this.fields}
            onSubmitError={this.handleSetErrorFocus}
            onSubmitSuccess={this.handleSetThankYouFocus}
          >
            {state => (
              <React.Fragment>
                <FormSuccessMessage
                  aria-hidden={state.submissionState !== 'success'}
                  show={state.submissionState === 'success'}
                  tabIndex={-1}
                  innerRef={this.thankYouMessage}
                >
                  <div>
                    <Type2 tag="p">Thanks! We&rsquo;ll be in touch.</Type2>
                    <Type4 tag={InvisibleButton} onClick={state.handleResetFormSubmission}>
                      All done.
                    </Type4>
                  </div>
                </FormSuccessMessage>
                <ContactForm {...state.form}>
                  <input type="hidden" name="form-name" value={state.form.name} />
                  <Field nameAs="name" fragment>
                    <Label>Name</Label>
                    <Input required {...state.fields.name} />
                  </Field>
                  <Field nameAs="address" fragment>
                    <Label>Address</Label>
                    <Input required {...state.fields.address} />
                  </Field>
                  <Field nameAs="homePhone" fragment>
                    <Label>Home phone</Label>
                    <Input
                      type="tel"
                      placeholder="123-456-7890"
                      pattern="[0-9]{0,1}-{0,1}[0-9]{3}-{0,1}[0-9]{3}-{0,1}?[0-9]{4}"
                      required
                      {...state.fields.homePhone}
                    />
                  </Field>
                  <Field nameAs="cellPhone" fragment>
                    <Label>Cell phone</Label>
                    <Input
                      type="tel"
                      placeholder="123-456-7890"
                      pattern="[0-9]{0,1}-{0,1}[0-9]{3}-{0,1}[0-9]{3}-{0,1}?[0-9]{4}"
                      required
                      {...state.fields.cellPhone}
                    />
                  </Field>
                  <Field nameAs="email" fragment>
                    <Label>Email</Label>
                    <Input {...state.fields.email} type="email" required />
                  </Field>
                  <Field nameAs="dob" fragment>
                    <Label>Date of birth</Label>
                    <Input {...state.fields.dob} placeholder="MM/DD/YYYY" maxlength="10" required />
                  </Field>
                  <Field nameAs="beginWorkDate" fragment>
                    <Label>Date available to begin working</Label>
                    <Input
                      {...state.fields.beginWorkDate}
                      placeholder="MM/DD/YYYY"
                      maxlength="10"
                      required
                    />
                  </Field>
                  <Field nameAs="desiredSalary" fragment>
                    <Label>Desired salary</Label>
                    <Input {...state.fields.desiredSalary} />
                  </Field>
                  <Field nameAs="position" fragment>
                    <Label>Position you are applying for</Label>
                    <Input {...state.fields.position} required />
                  </Field>

                  <AdditionalRequirements>
                    {/* TODO: move this text to markdown */}
                    <p>Please Call To Provide:</p>
                    <ol>
                      <li>Your Social Security Number</li>
                      <li>Your Driver&rsquo;s License Number / State / EXP</li>
                    </ol>
                  </AdditionalRequirements>
                  <Button type="submit">Submit</Button>
                  {state.submissionState === 'error' && (
                    <FormErrorMessage tabIndex={-1} innerRef={this.errorMessage}>
                      Sorry.{' '}
                      <span role="img" aria-label="Sad face">
                        😔
                      </span>{' '}
                      There was an problem submitting your message. Please try again.
                    </FormErrorMessage>
                  )}
                </ContactForm>
              </React.Fragment>
            )}
          </NetlifyFormComposer>
        </PageLayout>
      </PageContainer>
    );
  }
}

export default styled(Careers)`
  padding-top: 2rem;
`;
