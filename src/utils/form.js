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
