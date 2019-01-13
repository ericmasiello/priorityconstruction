import React from 'react';
import PropTypes from 'prop-types';
import { encode } from '../utils/form';

/* eslint-disable react/sort-comp */
export default class NetlifyFormComposer extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    formName: PropTypes.string.isRequired,
    onSubmitSuccess: PropTypes.func,
    onSubmitError: PropTypes.func,
    recaptchaValue: PropTypes.string,
    recaptchaInstance: PropTypes.shape({
      current: PropTypes.object,
    }),
    onResetRecaptcha: PropTypes.func,
  };

  static defaultProps = {
    onSubmitSuccess: () => {},
    onSubmitError: () => {},
    onResetRecaptcha: () => {},
  };

  handleResetFormSubmission = handleReset => () => {
    this.setState({ submitted: false, submissionError: false });
    if (typeof handleReset === 'function') {
      handleReset();
    }
    if (
      this.props.recaptchaInstance &&
      this.props.recaptchaInstance.current &&
      typeof this.props.recaptchaInstance.current.reset === 'function'
    ) {
      this.props.recaptchaInstance.current.reset();
    }
  };

  handleSubmit = (values, actions) => {
    // optimistically render a success message
    this.setState({ submitted: true, submissionError: false }, this.props.onSubmitSuccess);

    return fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': this.props.formName,
        ...values,
        'g-recaptcha-response': this.props.recaptchaValue,
      }),
    })
      .then(() => {
        if (actions && typeof actions.setSubmitting === 'function') {
          actions.setSubmitting(false);
        }
        this.props.onResetRecaptcha();
      })
      .catch(error => {
        // eslint-disable-next-line
        console.error(error);
        this.setState({ submitted: false, submissionError: true }, () => {
          this.props.onResetRecaptcha();
          this.props.onSubmitError(error);
        });
      });
  };

  state = {
    formName: this.props.formName,
    submitted: false,
    submissionError: false,
    handleResetFormSubmission: this.handleResetFormSubmission,
    handleSubmit: this.handleSubmit,
  };

  render() {
    return this.props.children(this.state);
  }
}
