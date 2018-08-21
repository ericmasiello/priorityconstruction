export const encode = data =>
  Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

export const fieldsToKeyValues = fields =>
  Object.keys(fields).reduce((acc, key) => {
    acc[key] = fields[key].value;
    return acc;
  }, {});

export const fieldsToFieldState = (fields, onChange) => {
  if (Array.isArray(fields)) {
    return fields.reduce((acc, field) => {
      acc[field] = {
        name: field,
        onChange,
        value: '',
      };
      return acc;
    }, {});
  } else if (typeof fields === 'object') {
    return Object.keys(fields).reduce((acc, key) => {
      acc[key] = Object.assign(
        {
          name: key,
          onChange,
          value: '',
        },
        fields[key],
      );
      return acc;
    }, {});
  }
  return {};
};

export const validateFields = (validationFields, values) => {
  const defaultValidationResult = {
    hasErrors: false,
    fields: {},
  };
  const result = validationFields.reduce((acc, key) => {
    const field = values[key];

    if (field.required && field.value === '') {
      acc.fields[key] = {
        ...field,
        error: true,
        message: 'Field is required',
      };
      acc.hasErrors = true;
    } else if (field.pattern && field.value !== '' && field.value.match(field.pattern) === null) {
      acc.fields[key] = {
        ...field,
        error: true,
        message: 'Content is invalid',
      };
      acc.hasErrors = true;
    } else {
      acc.fields[key] = {
        ...field,
        error: false,
        message: '',
      };
    }
    return acc;
  }, defaultValidationResult);
  return result;
};
