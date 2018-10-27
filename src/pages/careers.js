import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Button from '../components/Button';
import Type1 from '../components/Type1';
import Type3 from '../components/Type3';
import Type4 from '../components/Type4';
import InvisibleButton from '../components/InvisibleButton';
import NetlifyFormComposer from '../components/NetlifyFormComposer';
import ErrorMessage from '../components/ErrorMessage';
import FormSuccessMessage from '../components/FormSuccessMessage';
import { pxToRem } from '../styles/utils';
import states from '../content/usStates.json';
import BaseFieldError from '../components/FieldError';
import * as CustomPropTypes from '../propTypes';
import config from '../config/careers';
import { telephoneProps, emailProps, dateProps } from '../utils/form';

const FieldError = styled(BaseFieldError)`
  @media (min-width: ${pxToRem(500)}) {
    grid-column: 2 / -1;
  }
`;

const SectionTitle = styled(Type4)`
  margin-bottom: 0;
  text-transform: uppercase;
`;

const FormErrorMessage = styled(ErrorMessage)`
  margin-top: 1rem;
`;

const PageLayout = styled.div`
  position: relative;
`;

const ContactForm = styled.form`
  display: grid;

  ${Textarea} {
    min-height: ${pxToRem(250)};
  }

  ${Label}, fieldset {
    margin-top: 1rem;
  }
`;

const FieldGroups = styled.div`
  display: flex;
  align-items: center;

  ${Input} {
    margin-right: 1rem;
  }
`;

class Careers extends React.Component {
  static displayName = 'Careers';

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
      intro: CustomPropTypes.Markdown,
      additionalInfo: CustomPropTypes.Markdown,
    }).isRequired,
  };

  thankYouMessage = React.createRef();

  errorMessage = React.createRef();

  handleSetThankYouFocus = () => {
    this.thankYouMessage.current.focus();
  };

  handleSetErrorFocus = () => {
    this.errorMessage.current.focus();
  };

  render() {
    const { className, data } = this.props;
    return (
      <NetlifyFormComposer
        formName="careers"
        onSubmitSuccess={this.handleSetThankYouFocus}
        onSubmitError={this.handleSetErrorFocus}
      >
        {netlifyState => (
          <Formik {...config} onSubmit={netlifyState.handleSubmit}>
            {props => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;
              return (
                <PageContainer tag="section" className={className}>
                  <PageLayout>
                    <FormSuccessMessage
                      aria-hidden={!netlifyState.submitted}
                      show={netlifyState.submitted}
                      tabIndex={-1}
                      innerRef={this.thankYouMessage}
                    >
                      <div>
                        <Type1 tag="p">Thanks! We&rsquo;ll be in touch.</Type1>
                        <Type3
                          tag={InvisibleButton}
                          onClick={netlifyState.handleResetFormSubmission(handleReset)}
                        >
                          All done.
                        </Type3>
                      </div>
                    </FormSuccessMessage>
                    {netlifyState.submissionError === 'error' && (
                      <FormErrorMessage tabIndex={-1} innerRef={this.errorMessage}>
                        Sorry.
                        {' '}
                        <span role="img" aria-label="Sad face">
                          😔
                        </span>
                        {' '}
                        There was an problem submitting your message. Please try again.
                      </FormErrorMessage>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: data.intro.html }} />
                    <ContactForm name={netlifyState.formName} onSubmit={handleSubmit}>
                      <input type="hidden" name="form-name" value={netlifyState.formName} />

                      <SectionTitle tag="h2">Personal Information</SectionTitle>

                      <Field nameAs="name" fragment>
                        <Label>Name</Label>
                        <Input
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.name && touched.name}
                        />
                      </Field>
                      <FieldError component="div" name="name" />

                      <Field nameAs="address" fragment>
                        <Label>Address</Label>
                        <Input
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.address && touched.address}
                        />
                      </Field>
                      <FieldError component="div" name="address" />

                      <Field nameAs="phone" fragment>
                        <Label>Phone</Label>
                        <Input
                          {...telephoneProps}
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.phone && touched.phone}
                        />
                      </Field>
                      <FieldError component="div" name="phone" />

                      <Field nameAs="email" fragment>
                        <Label>Email</Label>
                        <Input
                          {...emailProps}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.email && touched.email}
                        />
                      </Field>
                      <FieldError component="div" name="email" />

                      <Field nameAs="dob" fragment>
                        <Label>Date of birth</Label>
                        <Input
                          {...dateProps}
                          value={values.dob}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.dob && touched.dob}
                        />
                      </Field>
                      <FieldError component="div" name="dob" />

                      <Field nameAs="beginWorkDate" fragment>
                        <Label>Date available to begin working</Label>
                        <Input
                          {...dateProps}
                          value={values.beginWorkDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.beginWorkDate && touched.beginWorkDate}
                        />
                      </Field>
                      <FieldError component="div" name="beginWorkDate" />

                      <Field nameAs="desiredSalary" fragment>
                        <Label>Desired salary</Label>
                        <Input
                          value={values.desiredSalary}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.desiredSalary && touched.desiredSalary}
                        />
                      </Field>
                      <FieldError component="div" name="desiredSalary" />

                      <Field nameAs="position" fragment>
                        <Label>Position you are applying for</Label>
                        <Input
                          value={values.position}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.position && touched.position}
                        />
                      </Field>
                      <FieldError component="div" name="position" />

                      <fieldset>
                        <legend>Are you available to work on weekends?</legend>
                        <FieldGroups>
                          <Input
                            name="canWorkWeekends"
                            type="radio"
                            value="yes"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.canWorkWeekends && touched.canWorkWeekends}
                          >
                            Yes
                          </Input>
                          <Input
                            name="canWorkWeekends"
                            type="radio"
                            value="no"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.canWorkWeekends && touched.canWorkWeekends}
                          >
                            No
                          </Input>
                        </FieldGroups>
                        <FieldError component="div" name="canWorkWeekends" />
                      </fieldset>

                      <fieldset>
                        <legend>Are you capable of physical labor?</legend>
                        <FieldGroups>
                          <Input
                            name="capableOfPhysicalLabor"
                            type="radio"
                            value="yes"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.capableOfPhysicalLabor && touched.capableOfPhysicalLabor}
                          >
                            Yes
                          </Input>
                          <Input
                            name="capableOfPhysicalLabor"
                            type="radio"
                            value="no"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.capableOfPhysicalLabor && touched.capableOfPhysicalLabor}
                          >
                            No
                          </Input>
                        </FieldGroups>
                        <FieldError component="div" name="capableOfPhysicalLabor" />
                      </fieldset>

                      <fieldset>
                        <legend>Have you ever been convicted of a felony?</legend>
                        <FieldGroups>
                          <Input
                            name="convictedOfFelony"
                            type="radio"
                            value="yes"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.convictedOfFelony && touched.convictedOfFelony}
                          >
                            Yes
                          </Input>
                          <Input
                            name="convictedOfFelony"
                            type="radio"
                            value="no"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.convictedOfFelony && touched.convictedOfFelony}
                          >
                            No
                          </Input>
                        </FieldGroups>
                        <FieldError component="div" name="convictedOfFelony" />
                      </fieldset>

                      {values.convictedOfFelony === 'yes' && (
                        <React.Fragment>
                          <Field nameAs="felonyExplanation" fragment>
                            <Label>Please explain:</Label>
                            <Textarea
                              value={values.felonyExplanation}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors.felonyExplanation && touched.felonyExplanation}
                            />
                          </Field>
                          <FieldError component="div" name="felonyExplanation" />
                        </React.Fragment>
                      )}

                      <fieldset>
                        <legend>Have you previously worked for Priority Construction?</legend>
                        <FieldGroups>
                          <Input
                            name="previouslyWorkedForPriority"
                            type="radio"
                            value="yes"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors.previouslyWorkedForPriority &&
                              touched.previouslyWorkedForPriority
                            }
                          >
                            Yes
                          </Input>
                          <Input
                            name="previouslyWorkedForPriority"
                            type="radio"
                            value="no"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              errors.previouslyWorkedForPriority &&
                              touched.previouslyWorkedForPriority
                            }
                          >
                            No
                          </Input>
                        </FieldGroups>
                        <FieldError component="div" name="previouslyWorkedForPriority" />
                      </fieldset>

                      {values.previouslyWorkedForPriority === 'yes' && (
                        <React.Fragment>
                          <Field nameAs="previousWorkforPriorityDetails" fragment>
                            <Label>
                              When did you work for Priority Construction and who was your
                              supervisor?
                            </Label>
                            <Textarea
                              value={values.previousWorkforPriorityDetails}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                errors.previousWorkforPriorityDetails &&
                                touched.previousWorkforPriorityDetails
                              }
                            />
                          </Field>
                          <FieldError component="div" name="previousWorkforPriorityDetails" />
                        </React.Fragment>
                      )}

                      <SectionTitle tag="h2">Previous Employment Experience</SectionTitle>

                      <Field nameAs="previousEmployerCompany" fragment>
                        <Label>Company</Label>
                        <Input
                          value={values.previousEmployerCompany}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.previousEmployerCompany && touched.previousEmployerCompany}
                        />
                      </Field>
                      <FieldError component="div" name="previousEmployerCompany" />

                      <Field nameAs="previousEmployerPhone" fragment>
                        <Label>Phone</Label>
                        <Input
                          {...telephoneProps}
                          value={values.previousEmployerPhone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.previousEmployerPhone && touched.previousEmployerPhone}
                        />
                      </Field>
                      <FieldError component="div" name="previousEmployerPhone" />

                      <Field nameAs="previousEmployerCity" fragment>
                        <Label>City</Label>
                        <Input
                          value={values.previousEmployerCity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.previousEmployerCity && touched.previousEmployerCity}
                        />
                      </Field>
                      <FieldError component="div" name="previousEmployerCity" />

                      <Field nameAs="previousEmployerState" fragment>
                        <Label>State</Label>
                        <Select
                          value={values.previousEmployerState}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.previousEmployerState && touched.previousEmployerState}
                        >
                          <option />
                          {Object.keys(states).map(key => (
                            <option key={key} value={key}>
                              {states[key]}
                            </option>
                          ))}
                        </Select>
                      </Field>
                      <FieldError component="div" name="previousEmployerState" />

                      <Field nameAs="previousEmployerJobTitle" fragment>
                        <Label>Job title</Label>
                        <Input
                          value={values.previousEmployerJobTitle}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors.previousEmployerJobTitle && touched.previousEmployerJobTitle
                          }
                        />
                      </Field>
                      <FieldError component="div" name="previousEmployerJobTitle" />

                      <Field nameAs="previousEmployerResponsibilities" fragment>
                        <Label>Responsibilities</Label>
                        <Textarea
                          value={values.previousEmployerResponsibilities}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors.previousEmployerResponsibilities &&
                            touched.previousEmployerResponsibilities
                          }
                        />
                      </Field>
                      <FieldError component="div" name="previousEmployerResponsibilities" />

                      <Field nameAs="previousEmployerStartDate" fragment>
                        <Label>Start date</Label>
                        <Input
                          {...dateProps}
                          value={values.previousEmployerStartDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors.previousEmployerStartDate && touched.previousEmployerStartDate
                          }
                        />
                      </Field>
                      <FieldError component="div" name="previousEmployerStartDate" />

                      <Field nameAs="previousEmployerEndDate" fragment>
                        <Label>End date</Label>
                        <Input
                          {...dateProps}
                          value={values.previousEmployerEndDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.previousEmployerEndDate && touched.previousEmployerEndDate}
                        />
                      </Field>
                      <FieldError component="div" name="previousEmployerEndDate" />

                      <Field nameAs="previousEmployerReasonForLeaving" fragment>
                        <Label>Reason for leaving</Label>
                        <Textarea
                          value={values.previousEmployerReasonForLeaving}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors.previousEmployerReasonForLeaving &&
                            touched.previousEmployerReasonForLeaving
                          }
                        />
                      </Field>
                      <FieldError component="div" name="previousEmployerReasonForLeaving" />

                      <Field nameAs="additionalQualifications" fragment>
                        <Label>Additional Qualifications</Label>
                        <Textarea
                          value={values.additionalQualifications}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            errors.additionalQualifications && touched.additionalQualifications
                          }
                        />
                      </Field>
                      <FieldError component="div" name="additionalQualifications" />

                      <SectionTitle tag="h2">Disclaimer and Signature</SectionTitle>

                      <Field nameAs="signature" fragment>
                        <Label>Signature</Label>
                        <Input
                          value={values.signature}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.signature && touched.signature}
                        />
                      </Field>
                      <FieldError component="div" name="signature" />

                      <Field nameAs="date" fragment>
                        <Label>Date</Label>
                        <Input
                          {...dateProps}
                          value={values.date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.date && touched.date}
                        />
                      </Field>
                      <FieldError component="div" name="date" />

                      <div dangerouslySetInnerHTML={{ __html: data.additionalInfo.html }} />

                      <Field nameAs="certification" fragment>
                        <Label>
                          I certify that my answers are true and complete to the best of my
                          knowledge. If this application leads to employment, I understand that
                          false or misleading information in my application or interview may result
                          in my release.
                        </Label>
                        <Input
                          name="certification"
                          type="checkbox"
                          value="yes"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.certification && touched.certification}
                        />
                      </Field>
                      <FieldError component="div" name="certification" />

                      <Button type="submit" disabled={isSubmitting}>
                        Submit
                      </Button>
                    </ContactForm>
                  </PageLayout>
                </PageContainer>
              );
            }}
          </Formik>
        )}
      </NetlifyFormComposer>
    );
  }
}

export default styled(Careers)`
  padding-top: 2rem;
`;

export const query = graphql`
  query CareersPage {
    intro: markdownRemark(id: { regex: "/content/careers/" }) {
      html
    }

    additionalInfo: markdownRemark(id: { regex: "/content/careersAdditionalInfo/" }) {
      html
    }
  }
`;
