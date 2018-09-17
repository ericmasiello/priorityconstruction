import React from 'react';
import PropTypes from 'prop-types';
import { encode, fieldsToKeyValues, fieldsToFieldState } from '../utils/form';

export default class NetlifyFormComposer extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fields: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.shape({})]),
    onSubmitSuccess: PropTypes.func,
    onSubmitError: PropTypes.func,
  };

  static defaultProps = {
    fields: [],
    onSubmitSuccess: () => {},
    onSubmitError: () => {},
  };

  constructor(...args) {
    super(...args);
    this.state = this.initState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.initState(nextProps));
  }

  initState = props => {
    const { name, fields } = props;

    return {
      form: {
        onSubmit: this.handleSubmit,
        method: 'POST',
        'data-netlify': true,
        name,
      },
      fields: fieldsToFieldState(fields, this.handleChange),
      submissionState: null,
      handleResetFormSubmission: this.handleResetFormSubmission,
    };
  };

  handleChange = event => {
    this.setState(prevState => {
      const value =
        event.target.type === 'checkbox' && event.target.checked === false
          ? undefined
          : event.target.value;
      return {
        fields: {
          ...prevState.fields,
          [event.target.name]: {
            ...prevState.fields[event.target.name],
            value,
          },
        },
      };
    });
  };

  handleSubmit = e => {
    // optimistically render a success message
    this.setState({ submissionState: 'success' }, this.props.onSubmitSuccess);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': this.props.name, ...fieldsToKeyValues(this.state.fields) }),
    })
      .then(() => {
        this.setState(prevState => {
          // once we know everything is submitted successfully,
          // clear the fields
          const fields = Object.keys(prevState.fields).reduce((acc, key) => {
            acc[key] = {
              ...prevState.fields[key],
              value: '',
            };
            return acc;
          }, {});

          return { fields };
        });
      })
      .catch(error => {
        // eslint-disable-next-line
        console.error(error);

        this.setState(
          {
            submissionState: 'error',
          },
          this.props.onSubmitError,
        );
      });

    e.preventDefault();
  };

  handleResetFormSubmission = () => this.setState({ submissionState: null });

  render() {
    return this.props.children(this.state);
  }
}
