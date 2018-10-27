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
  };

  static defaultProps = {
    onSubmitSuccess: () => {},
    onSubmitError: () => {},
  };

  handleResetFormSubmission = handleReset => () => {
    this.setState({ submitted: false, submissionError: false });
    if (typeof handleReset === 'function') {
      handleReset();
    }
  };

  handleSubmit = (values, actions) => {
    // optimistically render a success message
    this.setState({ submitted: true, submissionError: false }, this.props.onSubmitSuccess);

    return fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': this.props.formName, ...values }),
    })
      .then(() => {
        if (actions && typeof actions.setSubmitting === 'function') {
          actions.setSubmitting(false);
        }
      })
      .catch(error => {
        // eslint-disable-next-line
        console.error(error);
        this.setState({ submitted: false, submissionError: true }, () => {
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
