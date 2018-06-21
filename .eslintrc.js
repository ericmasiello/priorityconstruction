module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true,
  },
  globals: {
    graphql: true,
  },
  settings: {
    // These packages are provided 'magically' by Gatsby
    'import/core-modules': ['react', 'prop-types', 'react-dom'],
  },
  rules: {
    'react/no-danger': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
  },
};
