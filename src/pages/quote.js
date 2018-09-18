import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import Select from '../components/Select';
import Type2 from '../components/Type2';
import Type4 from '../components/Type4';
import InvisibleButton from '../components/InvisibleButton';
import NetlifyFormComposer from '../components/NetlifyFormComposer';
import ErrorMessage from '../components/ErrorMessage';
import FormSuccessMessage from '../components/FormSuccessMessage';
import { pxToRem } from '../styles/utils';
import * as CustomPropTypes from '../propTypes';

const FormErrorMessage = styled(ErrorMessage)`
  margin-top: 1rem;

  @media (min-width: ${pxToRem(500)}) {
    grid-column: span 2;
    margin-top: 0;
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

const projecTypes = [
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

  fields = ['name', 'company', 'phone', 'fax', 'email', 'comments', 'howDidYouHear', 'projectType'];

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
      <PageContainer tag="section" className={className}>
        <div dangerouslySetInnerHTML={{ __html: data.intro.html }} />
        <PageLayout>
          <NetlifyFormComposer
            name="quote"
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
                  <Field nameAs="company" fragment>
                    <Label>Company</Label>
                    <Input {...state.fields.company} />
                  </Field>
                  <Field nameAs="phone" fragment>
                    <Label>Phone</Label>
                    <Input
                      {...state.fields.phone}
                      type="tel"
                      placeholder="123-456-7890"
                      pattern="[0-9]{0,1}-{0,1}[0-9]{3}-{0,1}[0-9]{3}-{0,1}?[0-9]{4}"
                      required
                    />
                  </Field>
                  <Field nameAs="fax" fragment>
                    <Label>Fax</Label>
                    <Input
                      {...state.fields.fax}
                      type="tel"
                      placeholder="123-456-7890"
                      pattern="[0-9]{0,1}-{0,1}[0-9]{3}-{0,1}[0-9]{3}-{0,1}?[0-9]{4}"
                    />
                  </Field>
                  <Field nameAs="email" fragment>
                    <Label>Email</Label>
                    <Input {...state.fields.email} type="email" required />
                  </Field>
                  <Field nameAs="projectType" fragment>
                    <Label>Project type</Label>
                    <Select {...state.fields.projectType}>
                      {projecTypes.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field stack nameAs="comments" fragment>
                    <Label>Project description and comments</Label>
                    <Textarea {...state.fields.comments} required />
                  </Field>
                  <Field nameAs="howDidYouHear" fragment>
                    <Label>How did you hear about us?</Label>
                    <Input {...state.fields.howDidYouHear} />
                  </Field>
                  <Button type="submit">Submit</Button>
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
                </ContactForm>
              </React.Fragment>
            )}
          </NetlifyFormComposer>
        </PageLayout>
      </PageContainer>
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
