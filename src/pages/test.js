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
import Toggler from '../components/ViewToggler';
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

const config1 = {
  initialValues: {
    name: '',
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Enter your name'),
  }),
};

const config2 = {
  initialValues: {
    email: '',
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Enter a valid email address'),
  }),
};

const config3 = {
  initialValues: {
    phone: '',
  },
  validationSchema: Yup.object().shape({
    phone: Yup.string()
      .phone()
      .required('Enter your phone number'),
  }),
};

const views = ['step1', 'step2', 'step3'];

class Test extends React.Component {
  static displayName = 'Test';

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
      intro: CustomPropTypes.Markdown,
    }).isRequired,
  };

  state = { values: {}, actions: [] };

  thankYouMessage = React.createRef();

  errorMessage = React.createRef();

  handleSetThankYouFocus = () => {
    this.thankYouMessage.current.focus();
  };

  handleSetErrorFocus = () => {
    this.errorMessage.current.focus();
  };

  handleNext = (currentView, goToNext) => (values, actions) => {
    console.log(currentView, goToNext, values, actions);
    this.setState(
      prevState => ({
        values: {
          ...prevState.values,
          ...values,
        },
        actions: [...prevState.actions, actions],
      }),
      () => {
        goToNext();
      },
    );
  };

  handleSubmit = handleSubmit => (values, actions) => {
    this.setState(
      prevState => ({
        values: {
          ...prevState.values,
          ...values,
        },
        actions: [...prevState.actions, actions],
      }),
      () => {
        debugger;
        handleSubmit(this.state.values, actions);
      },
    );
  };

  handleResetAll = () => {
    this.state.actions.forEach(action => {
      debugger;
      action.resetForm();
    });
    // TODO: wrap this whole thing inside a withToggler HOC and then call method that bring you back to step 1
  };

  render() {
    const { className, data } = this.props;

    return (
      <Toggler views={views} initialSelection={views[0]}>
        <Toggler.Consumer>
          {togglerState => (
            <NetlifyFormComposer
              formName="test"
              onSubmitSuccess={this.handleSetThankYouFocus}
              onSubmitError={this.handleSetErrorFocus}
            >
              {netlifyState => (
                <PageContainer tag="section" className={className}>
                  <div dangerouslySetInnerHTML={{ __html: data.intro.html }} />
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
                          onClick={netlifyState.handleResetFormSubmission(this.handleResetAll)}
                        >
                          All done.
                        </Type3>
                      </div>
                    </FormSuccessMessage>
                    <Formik
                      {...config1}
                      onSubmit={this.handleNext(views[0], togglerState.goToNextView)}
                    >
                      {props => {
                        const {
                          values,
                          touched,
                          errors,
                          isSubmitting,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                        } = props;
                        return (
                          <Toggler.View view="step1">
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
                              <Button type="submit" disabled={isSubmitting}>
                                Next
                              </Button>
                            </ContactForm>
                          </Toggler.View>
                        );
                      }}
                    </Formik>
                    <Formik
                      {...config2}
                      onSubmit={this.handleNext(views[1], togglerState.goToNextView)}
                    >
                      {props => {
                        const {
                          values,
                          touched,
                          errors,
                          isSubmitting,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                        } = props;
                        return (
                          <Toggler.View view="step2">
                            <ContactForm name={netlifyState.formName} onSubmit={handleSubmit}>
                              <input type="hidden" name="form-name" value={netlifyState.formName} />
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
                              <Button type="submit" disabled={isSubmitting}>
                                Next
                              </Button>
                            </ContactForm>
                          </Toggler.View>
                        );
                      }}
                    </Formik>

                    <Formik {...config3} onSubmit={this.handleSubmit(netlifyState.handleSubmit)}>
                      {props => {
                        const {
                          values,
                          touched,
                          errors,
                          isSubmitting,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                        } = props;
                        return (
                          <Toggler.View view="step3">
                            <ContactForm name={netlifyState.formName} onSubmit={handleSubmit}>
                              <input type="hidden" name="form-name" value={netlifyState.formName} />
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
                              <Button type="submit" disabled={isSubmitting}>
                                Submit
                              </Button>
                            </ContactForm>
                          </Toggler.View>
                        );
                      }}
                    </Formik>
                  </PageLayout>
                </PageContainer>
              )}
            </NetlifyFormComposer>
          )}
        </Toggler.Consumer>
      </Toggler>
    );
  }
}

export default styled(Test)`
  padding-top: 2rem;
`;

export const query = graphql`
  query TestQuery {
    intro: markdownRemark(id: { regex: "/content/quote/" }) {
      html
    }
  }
`;
