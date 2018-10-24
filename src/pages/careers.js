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
import Type1 from '../components/Type1';
import Type3 from '../components/Type3';
import Type4 from '../components/Type4';
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

const TabTitle = styled(Type4)`
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
    return null;
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
