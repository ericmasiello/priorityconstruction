export const encode = data =>
  Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

export const fieldsToKeyValues = fields =>
  Object.keys(fields).reduce((acc, key) => {
    acc[key] = fields[key].value;
    return acc;
  }, {});
