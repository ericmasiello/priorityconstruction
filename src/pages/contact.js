import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import MarkdownBlock from '../components/MarkdownBlock';
import PageContainer from '../components/PageContainer';
import NetlifyFormComposer from '../components/NetlifyFormComposer';
import Field from '../components/Field';
import NetlifyForm from '../components/NetlifyForm';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import Small from '../components/Small';
import Type1 from '../components/Type1';
import Type3 from '../components/Type3';
import OfficeMap from '../components/OfficeMap';
import InvisibleButton from '../components/InvisibleButton';
import FormSuccessMessage from '../components/FormSuccessMessage';
import ErrorMessage from '../components/ErrorMessage';
import FieldError from '../components/FieldError';
import Recaptcha from '../components/Recaptcha';
import { pxToRem } from '../styles/utils';
import { TYPE_SIZE } from '../styles/vars';
import '../utils/validation/phone';

const PageLayout = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1rem;

  @media (min-width: ${pxToRem(960)}) {
    grid-template-columns: 1fr ${pxToRem(450)};
  }
`;

const FormErrorMessage = styled(ErrorMessage)`
  margin-top: 0.75rem;

  @media (min-width: ${pxToRem(500)}) {
    grid-column: 2 / -1;
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
  }),
};

class Contact extends React.Component {
  static displayName = 'Quote';

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
      site: PropTypes.shape({
        siteMetadata: PropTypes.shape({
          googleMapKey: PropTypes.string.isRequired,
          recaptchaSecretKey: PropTypes.string.isRequired,
        }),
      }),
    }).isRequired,
  };

  state = {
    recaptchaValue: null,
  };

  thankYouMessage = React.createRef();

  errorMessage = React.createRef();

  recaptchaInstance = React.createRef();

  handleVerifyRecaptcha = recaptchaValue => {
    this.setState({ recaptchaValue });
  };

  handleResetRecaptcha = () => this.setState({ recaptchaValue: null });

  handleSetThankYouFocus = () => {
    this.thankYouMessage.current.focus();
  };

  handleSetErrorFocus = () => {
    this.errorMessage.current.focus();
  };

  render() {
    const { data, className } = this.props;

    return (
      <NetlifyFormComposer
        formName="Contact"
        onSubmitSuccess={this.handleSetThankYouFocus}
        onSubmitError={this.handleSetErrorFocus}
        recaptchaValue={this.state.recaptchaValue}
        recaptchaInstance={this.recaptchaInstance}
        onResetRecaptcha={this.handleResetRecaptcha}
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
                    {netlifyState.submissionError && (
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
                    <NetlifyForm
                      name={netlifyState.formName}
                      onSubmit={handleSubmit}
                      handleChange={handleChange}
                    >
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

                      <Field nameAs="comments" fragment>
                        <Label>Comments</Label>
                        <Input
                          type="textarea"
                          value={values.comments}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.comments && touched.comments}
                        />
                      </Field>
                      <FieldError component="div" name="comments" />

                      <Recaptcha
                        recaptchaRef={this.recaptchaInstance}
                        sitekey={data.site.siteMetadata.recaptchaSecretKey}
                        render="explicit"
                        verifyCallback={this.handleVerifyRecaptcha}
                      />

                      {Object.keys(errors).length > 0 && (
                        <FormErrorMessage>Please correct all errors and resubmit.</FormErrorMessage>
                      )}

                      <Button type="submit" disabled={isSubmitting || !this.state.recaptchaValue}>
                        Submit
                      </Button>
                    </NetlifyForm>
                    <div>
                      <OfficeMap width="100%" mapKey={data.site.siteMetadata.googleMapKey} />
                      <p>
                        <a href="https://www.google.com/maps/place/1315+W+Hamburg+St/@39.277222,-76.632891,17z/">
                          <Small>1315 West Hamburg Street, Baltimore, MD 21203</Small>
                        </a>
                      </p>
                    </div>
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

export default styled(Contact)`
  padding-top: 2rem;
  padding-bottom: 3rem;

  ${MarkdownBlock} {
    font-size: ${pxToRem(TYPE_SIZE.t5[0])};
    line-height: ${TYPE_SIZE.t5[1]};
  }
`;

export const query = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        googleMapKey
        recaptchaSecretKey
      }
    }
  }
`;
