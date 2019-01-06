import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import MarkdownBlock from '../components/MarkdownBlock';
import NetlifyFormComposer from '../components/NetlifyFormComposer';
import Field from '../components/Field';
import NetlifyForm from '../components/NetlifyForm';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import Type1 from '../components/Type1';
import Type3 from '../components/Type3';
import InvisibleButton from '../components/InvisibleButton';
import ErrorMessage from '../components/ErrorMessage';
import FormSuccessMessage from '../components/FormSuccessMessage';
import FieldError from '../components/FieldError';
import { pxToRem } from '../styles/utils';
import { TYPE_SIZE } from '../styles/vars';
import * as CustomPropTypes from '../propTypes';
import '../utils/validation/phone';

const FormErrorMessage = styled(ErrorMessage)`
  margin-top: 1rem;
`;

const PageLayout = styled.div`
  position: relative;
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
                handleReset,
              } = props;
              return (
                <PageContainer tag="section" className={className}>
                  <MarkdownBlock dangerouslySetInnerHTML={{ __html: data.intro.html }} />
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
                      <NetlifyForm name={netlifyState.formName}>
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
                          <Input
                            type="select"
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
                          </Input>
                        </Field>
                        <FieldError component="div" name="projectType" />

                        <Field stack nameAs="comments" fragment>
                          <Label>Project description and comments</Label>
                          <Input
                            type="textarea"
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
                        {Object.keys(errors).length > 0 && (
                          <FormErrorMessage>
                            Please correct all errors and resubmit.
                          </FormErrorMessage>
                        )}
                        <div data-netlify-recaptcha="true" />
                        <Button type="submit" disabled={isSubmitting}>
                          Submit
                        </Button>
                      </NetlifyForm>
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
  padding-bottom: 3rem;

  ${MarkdownBlock} {
    font-size: ${pxToRem(TYPE_SIZE.t5[0])};
    line-height: ${TYPE_SIZE.t5[1]};
  }
`;

export const query = graphql`
  query QuoteQuery {
    intro: markdownRemark(id: { regex: "/content/quote/intro/" }) {
      html
    }
  }
`;
