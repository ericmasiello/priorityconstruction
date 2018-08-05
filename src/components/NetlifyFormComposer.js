import React from 'react';
import PropTypes from 'prop-types';
import { encode, fieldsToKeyValues } from '../utils/form';

export default class NetlifyFormComposer extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fields: PropTypes.arrayOf(PropTypes.string),
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
      fields: fields.reduce((acc, field) => {
        acc[field] = {
          name: field,
          onChange: this.handleChange,
          value: '',
        };
        return acc;
      }, {}),
      submissionState: null,
      handleResetFormSubmission: this.handleResetFormSubmission,
    };
  };

  handleChange = event => {
    this.setState({
      fields: {
        ...this.state.fields,
        [event.target.name]: {
          value: event.target.value,
          onChange: this.state.fields[event.target.name].onChange,
          name: event.target.name,
        },
      },
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
        // once we know everything is submitted successfully,
        // clear the fields
        const fields = Object.keys(this.state.fields).reduce((acc, key) => {
          acc[key] = {
            ...this.state.fields[key],
            value: '',
          };
          return acc;
        }, {});

        this.setState({ fields });
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
