import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Button from '../components/Button';
import Type2 from '../components/Type2';
import Type4 from '../components/Type4';
import Type5 from '../components/Type5';
import InvisibleButton from '../components/InvisibleButton';
import NetlifyFormComposer from '../components/NetlifyFormComposer';
import ErrorMessage from '../components/ErrorMessage';
import FormSuccessMessage from '../components/FormSuccessMessage';
import Toggler from '../components/ViewToggler';
import { pxToRem } from '../styles/utils';
import states from '../content/usStates.json';
import * as CustomPropTypes from '../propTypes';
import { fields, views, viewFields } from '../config/careers';
import { validateFields } from '../utils/form';

const TabTitle = styled(Type5)`
  margin-bottom: 0;
  text-transform: uppercase;
`;

const FormErrorMessage = styled(ErrorMessage)`
  margin-top: 1rem;
`;

const PageLayout = styled.div`
  position: relative;
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;

  ${Button} {
    flex: 1;

    @media (min-width: ${pxToRem(500)}) {
      &:first-of-type {
        margin-right: 0.5rem;
      }

      &:last-of-type {
        margin-left: 0.5rem;
      }
    }
  }
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
    }),
  };

  state = {
    fields,
    hasErrors: false,
  };

  thankYouMessage = React.createRef();

  errorMessage = React.createRef();

  handleSetThankYouFocus = () => {
    this.thankYouMessage.current.focus();
  };

  handleSetErrorFocus = () => {
    this.errorMessage.current.focus();
  };

  handleValiation = (fieldObjects, selectedView, goToNextView) => () => {
    const validationResult = validateFields(viewFields[selectedView], fieldObjects);

    this.setState(prevState => ({
      fields: Object.assign({}, prevState.fields, validationResult.fields),
      hasErrors: validationResult.hasErrors,
    }));

    if (validationResult.hasErrors === false) {
      goToNextView();
    }
  };

  render() {
    const { className, data } = this.props;
    return (
      <Toggler views={views} initialSelection={views[0]}>
        <PageContainer tag="section" className={className}>
          <PageLayout>
            <NetlifyFormComposer
              name="careers"
              fields={this.state.fields}
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

                    <Toggler.View view="personalInformation">
                      <div dangerouslySetInnerHTML={{ __html: data.intro.html }} />
                      <TabTitle>Personal Information</TabTitle>
                      <Field nameAs="name" fragment>
                        <Label>Name</Label>
                        <Input {...state.fields.name} />
                      </Field>
                      <Field nameAs="address" fragment>
                        <Label>Address</Label>
                        <Input {...state.fields.address} />
                      </Field>
                      <Field nameAs="homePhone" fragment>
                        <Label>Home phone</Label>
                        <Input {...state.fields.homePhone} />
                      </Field>
                      <Field nameAs="cellPhone" fragment>
                        <Label>Cell phone</Label>
                        <Input {...state.fields.cellPhone} />
                      </Field>
                      <Field nameAs="email" fragment>
                        <Label>Email</Label>
                        <Input {...state.fields.email} type="email" />
                      </Field>
                      <Field nameAs="dob" fragment>
                        <Label>Date of birth</Label>
                        <Input {...state.fields.dob} placeholder="MM/DD/YYYY" maxLength="10" />
                      </Field>
                      <Field nameAs="beginWorkDate" fragment>
                        <Label>Date available to begin working</Label>
                        <Input {...state.fields.beginWorkDate} />
                      </Field>
                      <Field nameAs="desiredSalary" fragment>
                        <Label>Desired salary</Label>
                        <Input {...state.fields.desiredSalary} />
                      </Field>
                      <Field nameAs="position" fragment>
                        <Label>Position you are applying for</Label>
                        <Input {...state.fields.position} />
                      </Field>
                      <fieldset>
                        <legend>Are you available to work on weekends?</legend>
                        <FieldGroups>
                          <Input
                            {...state.fields.canWorkWeekends}
                            checked={state.fields.canWorkWeekends.value === 'yes'}
                            value="yes"
                          >
                            Yes
                          </Input>
                          <Input
                            {...state.fields.canWorkWeekends}
                            checked={state.fields.canWorkWeekends.value === 'no'}
                            value="no"
                          >
                            No
                          </Input>
                        </FieldGroups>
                      </fieldset>
                      <fieldset>
                        <legend>Are you capable of physical labor?</legend>
                        <FieldGroups>
                          <Input
                            {...state.fields.capableOfPhysicalLabor}
                            checked={state.fields.capableOfPhysicalLabor.value === 'yes'}
                            value="yes"
                          >
                            Yes
                          </Input>
                          <Input
                            {...state.fields.capableOfPhysicalLabor}
                            checked={state.fields.capableOfPhysicalLabor.value === 'no'}
                            value="no"
                          >
                            No
                          </Input>
                        </FieldGroups>
                      </fieldset>

                      <fieldset>
                        <legend>Have you ever been convicted of a felony?</legend>
                        <FieldGroups>
                          <Input
                            {...state.fields.convictedOfFelony}
                            checked={state.fields.convictedOfFelony.value === 'yes'}
                            value="yes"
                          >
                            Yes
                          </Input>
                          <Input
                            {...state.fields.convictedOfFelony}
                            checked={state.fields.convictedOfFelony.value === 'no'}
                            value="no"
                          >
                            No
                          </Input>
                        </FieldGroups>
                      </fieldset>

                      {state.fields.convictedOfFelony.value === 'yes' && (
                        <Field nameAs="felonyExplanation" fragment>
                          <Label>Please explain:</Label>
                          <Textarea {...state.fields.felonyExplanation} />
                        </Field>
                      )}

                      <fieldset>
                        <legend>Have you previously worked for Priority Construction?</legend>
                        <FieldGroups>
                          <Input
                            {...state.fields.previouslyWorkedForPriority}
                            checked={state.fields.previouslyWorkedForPriority.value === 'yes'}
                            value="yes"
                          >
                            Yes
                          </Input>
                          <Input
                            {...state.fields.previouslyWorkedForPriority}
                            checked={state.fields.previouslyWorkedForPriority.value === 'no'}
                            value="no"
                          >
                            No
                          </Input>
                        </FieldGroups>
                      </fieldset>

                      {state.fields.previouslyWorkedForPriority.value === 'yes' && (
                        <Field nameAs="previousWorkforPriorityDetails" fragment>
                          <Label>
                            When did you work for Priority Construction and who was your supervisor?
                          </Label>
                          <Textarea {...state.fields.previousWorkforPriorityDetails} />
                        </Field>
                      )}
                    </Toggler.View>

                    <Toggler.View view="previousEmployment">
                      <TabTitle>Previous Employment Experience</TabTitle>
                      <Field nameAs="previousEmployerCompany" fragment>
                        <Label>Company</Label>
                        <Input {...state.fields.previousEmployerCompany} />
                      </Field>
                      <Field nameAs="previousEmployerPhone" fragment>
                        <Label>Phone</Label>
                        <Input {...state.fields.previousEmployerPhone} />
                      </Field>
                      <Field nameAs="previousEmployerCity" fragment>
                        <Label>City</Label>
                        <Input {...state.fields.previousEmployerCity} />
                      </Field>
                      <Field nameAs="previousEmployerState" fragment>
                        <Label>State</Label>
                        <Select {...state.fields.previousEmployerState}>
                          <option />
                          {Object.keys(states).map(key => (
                            <option key={key} value={key}>
                              {states[key]}
                            </option>
                          ))}
                        </Select>
                      </Field>
                      <Field nameAs="previousEmployerJobTitle" fragment>
                        <Label>Job title</Label>
                        <Input {...state.fields.previousEmployerJobTitle} />
                      </Field>
                      <Field nameAs="previousEmployerResponsibilities" fragment>
                        <Label>Responsibilities</Label>
                        <Textarea {...state.fields.previousEmployerResponsibilities} />
                      </Field>
                      <Field nameAs="previousEmployerStartDate" fragment>
                        <Label>Start date</Label>
                        <Input {...state.fields.previousEmployerStartDate} />
                      </Field>
                      <Field nameAs="previousEmployerEndDate" fragment>
                        <Label>End date</Label>
                        <Input {...state.fields.previousEmployerEndDate} />
                      </Field>
                      <Field nameAs="previousEmployerReasonForLeaving" fragment>
                        <Label>Reason for leaving</Label>
                        <Textarea {...state.fields.previousEmployerReasonForLeaving} />
                      </Field>
                    </Toggler.View>

                    <Toggler.View view="additionalQualifications">
                      <TabTitle>Additional Qualifications</TabTitle>
                      <Field nameAs="additionalQualifications" fragment>
                        <Label>Additional qualifications</Label>
                        <Textarea {...state.fields.additionalQualifications} />
                      </Field>
                    </Toggler.View>

                    <Toggler.View view="disclaimerAndSignature">
                      <TabTitle>Disclaimer and Signature</TabTitle>
                      <Field nameAs="signature" fragment>
                        <Label>Signature</Label>
                        <Input {...state.fields.signature} />
                      </Field>
                      <Field nameAs="date" fragment>
                        <Label>Date</Label>
                        <Input {...state.fields.date} />
                      </Field>
                      <div dangerouslySetInnerHTML={{ __html: data.additionalInfo.html }} />
                      <Field nameAs="certification" fragment>
                        <Label>
                          I certify that my answers are true and complete to the best of my
                          knowledge. If this application leads to employment, I understand that
                          false or misleading information in my application or interview may result
                          in my release.
                        </Label>
                        <Input
                          {...state.fields.certification}
                          checked={state.fields.certification.value === 'yes'}
                          value="yes"
                        />
                      </Field>
                    </Toggler.View>

                    <Toggler.Consumer>
                      {togglerState => (
                        <ButtonContainer>
                          {/* NOTE: keep the "key" property else React will act strangely when swapping the next and submit buttons */}
                          <Button
                            key="previous"
                            type="button"
                            onClick={togglerState.goToPreviousView}
                            disabled={togglerState.selected === views[0]}
                          >
                            Previous
                          </Button>
                          {togglerState.selected === views[views.length - 1] ? (
                            <Button key="submit" type="submit">
                              Submit
                            </Button>
                          ) : (
                            <Button
                              key="next"
                              type="button"
                              onClick={this.handleValiation(
                                state.fields,
                                togglerState.selected,
                                togglerState.goToNextView,
                              )}
                            >
                              Next
                            </Button>
                          )}
                        </ButtonContainer>
                      )}
                    </Toggler.Consumer>

                    {state.submissionState === 'error' && (
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

                    {this.state.hasErrors && (
                      <FormErrorMessage tabIndex={-1} innerRef={this.errorMessage}>
                        Please correct any missing or invalid information above.
                      </FormErrorMessage>
                    )}
                  </ContactForm>
                </React.Fragment>
              )}
            </NetlifyFormComposer>
          </PageLayout>
        </PageContainer>
      </Toggler>
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
