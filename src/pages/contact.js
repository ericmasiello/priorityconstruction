import React from 'react';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import Small from '../components/Small';
import Type1 from '../components/Type1';
import Type3 from '../components/Type3';
import OfficeMap from '../components/OfficeMap';
import InvisibleButton from '../components/InvisibleButton';
import FormSuccessMessage from '../components/FormSuccessMessage';
import ErrorMessage from '../components/ErrorMessage';
import * as CustomPropTypes from '../propTypes';
import { pxToRem } from '../styles/utils';
import { COLORS } from '../styles/vars';
import { encode } from '../utils/form';
import '../utils/validation/phone';

const PageLayout = styled.div`
  position: relative;
  margin-top: 3rem;
  display: grid;
  grid-gap: 1rem;

  @media (min-width: ${pxToRem(960)}) {
    grid-template-columns: 1fr ${pxToRem(450)};
  }
`;

const FormErrorMessage = styled(ErrorMessage)`
  margin-top: 1rem;
  margin-bottom: 1rem;

  @media (min-width: ${pxToRem(500)}) {
    grid-column: 2 / -1;
  }
`;

const FieldError = styled(FormikErrorMessage)`
  color: ${COLORS.error};
  @media (min-width: ${pxToRem(500)}) {
    grid-column: 2 / -1;
  }
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

const FORM_NAME = 'contact';

class Contact extends React.Component {
  static displayName = 'Quote';

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
      intro: CustomPropTypes.Markdown,
    }).isRequired,
  };

  thankYouMessage = React.createRef();

  errorMessage = React.createRef();

  state = { submitted: false, submissionError: false };

  handleResetFormSubmission = handleReset => () => {
    this.setState({ submitted: false, submissionError: false });
    handleReset();
  };

  handleSubmit = (values, actions) => {
    // optimistically render a success message
    this.setState({ submitted: true, submissionError: false }, () => {
      this.thankYouMessage.current.focus();
    });

    return fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': FORM_NAME, ...values }),
    })
      .then(() => {
        actions.setSubmitting(false);
      })
      .catch(error => {
        // eslint-disable-next-line
        console.error(error);

        this.setState({ submitted: false, submissionError: true }, () => {
          this.errorMessage.current.focus();
        });
      });
  };

  render() {
    const { data, className } = this.props;

    return (
      <Formik {...config} onSubmit={this.handleSubmit}>
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
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
                <FormSuccessMessage
                  aria-hidden={!this.state.submitted}
                  show={this.state.submitted}
                  tabIndex={-1}
                  innerRef={this.thankYouMessage}
                >
                  <div>
                    <Type1 tag="p">Thanks! We&rsquo;ll be in touch.</Type1>
                    <Type3
                      tag={InvisibleButton}
                      onClick={this.handleResetFormSubmission(handleReset)}
                    >
                      All done.
                    </Type3>
                  </div>
                </FormSuccessMessage>
                {this.state.submissionError && (
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
                <ContactForm name={FORM_NAME} onSubmit={handleSubmit}>
                  <input type="hidden" name="form-name" value={FORM_NAME} />

                  <Field nameAs="name" fragment>
                    <Label>Name</Label>
                    <Input
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.name && touched.name}
                    />
                  </Field>
                  <FieldError component={Small} name="name" />

                  <Field nameAs="company" fragment>
                    <Label>Company</Label>
                    <Input
                      value={values.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.company && touched.company}
                    />
                  </Field>
                  <FieldError component={Small} name="company" />

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
                  <FieldError component={Small} name="phone" />

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
                  <FieldError component={Small} name="fax" />

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
                  <FieldError component={Small} name="email" />

                  <Field nameAs="comments" fragment>
                    <Label>Additional comments</Label>
                    <Textarea
                      type="comments"
                      value={values.comments}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.comments && touched.comments}
                    />
                  </Field>
                  <FieldError component={Small} name="comments" />

                  <Button type="button" onClick={handleReset} disabled={!dirty || isSubmitting}>
                    Reset
                  </Button>

                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </ContactForm>
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
    );
  }
}

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

    intro: markdownRemark(id: { regex: "/content/contact/" }) {
      html
    }
  }
`;
