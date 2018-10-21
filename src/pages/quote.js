import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import NetlifyFormComposer from '../components/NetlifyFormComposer';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import Select from '../components/Select';
import Type1 from '../components/Type1';
import Type3 from '../components/Type3';
import InvisibleButton from '../components/InvisibleButton';
import ErrorMessage from '../components/ErrorMessage';
import FormSuccessMessage from '../components/FormSuccessMessage';
import BaseFieldError from '../components/FieldError';
import { pxToRem } from '../styles/utils';
import * as CustomPropTypes from '../propTypes';
import '../utils/validation/phone';

const FormErrorMessage = styled(ErrorMessage)`
  margin-top: 1rem;

  @media (min-width: ${pxToRem(500)}) {
    grid-column: span 2;
    margin-top: 0;
  }
`;

const FieldError = styled(BaseFieldError)`
  @media (min-width: ${pxToRem(500)}) {
    grid-column: 2 / -1;
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

const config = {
  initialValues: {
    name: '',
    company: '',
    phone: '',
    fax: '',
    email: '',
    comments: '',
    howDidYouHear: '',
    projectType: '',
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Enter your name'),
    email: Yup.string()
      .email()
      .required('Enter a valid email address'),
    phone: Yup.string()
      .phone()
      .required('Enter your phone number'),
    fax: Yup.string().phone(),
    comments: Yup.string().required('Enter your comment'),
    howDidYouHear: Yup.string(),
    projectType: Yup.string().required('Select a type of project'),
  }),
};

const projecTypes = [
  '',
  'Brick Paving',
  'Flatwork Concrete',
  'Pervious Concrete',
  'Stamped & Colored Concrete',
  'Structural Concrete',
  'Other',
];

class Quote extends React.Component {
  static displayName = 'Quote';

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
      intro: CustomPropTypes.Markdown,
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
        formName="quote"
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
                  <div dangerouslySetInnerHTML={{ __html: data.intro.html }} />
                  <PageLayout>
                    <React.Fragment>
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
                      <ContactForm name={netlifyState.formName} onSubmit={handleSubmit}>
                        <input type="hidden" name="form-name" value={netlifyState.formName} />
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

                        <Field nameAs="company" fragment>
                          <Label>Company</Label>
                          <Input
                            value={values.company}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.company && touched.company}
                          />
                        </Field>
                        <FieldError component="div" name="company" />

                        <Field nameAs="phone" fragment>
                          <Label>Phone</Label>
                          <Input
                            type="tel"
                            placeholder="123-456-7890"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.phone && touched.phone}
                          />
                        </Field>
                        <FieldError component="div" name="phone" />

                        <Field nameAs="fax" fragment>
                          <Label>Fax</Label>
                          <Input
                            type="tel"
                            placeholder="123-456-7890"
                            value={values.fax}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.fax && touched.fax}
                          />
                        </Field>
                        <FieldError component="div" name="fax" />

                        <Field nameAs="email" fragment>
                          <Label>Email</Label>
                          <Input
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email && touched.email}
                          />
                        </Field>
                        <FieldError component="div" name="email" />

                        <Field nameAs="projectType" fragment>
                          <Label>Project type</Label>
                          <Select
                            value={values.projectType}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.projectType && touched.projectType}
                          >
                            {projecTypes.map(type => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </Select>
                        </Field>
                        <FieldError component="div" name="projectType" />

                        <Field stack nameAs="comments" fragment>
                          <Label>Project description and comments</Label>
                          <Textarea
                            value={values.comments}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.comments && touched.comments}
                          />
                        </Field>
                        <FieldError component="div" name="comments" />

                        <Field nameAs="howDidYouHear" fragment>
                          <Label>How did you hear about us?</Label>
                          <Input
                            value={values.howDidYouHear}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.howDidYouHear && touched.howDidYouHear}
                          />
                        </Field>
                        <FieldError component="div" name="howDidYouHear" />

                        <Button type="submit" disabled={isSubmitting}>
                          Submit
                        </Button>
                      </ContactForm>
                    </React.Fragment>
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

export default styled(Quote)`
  padding-top: 2rem;
`;

export const query = graphql`
  query QuoteQuery {
    intro: markdownRemark(id: { regex: "/content/quote/" }) {
      html
    }
  }
`;
