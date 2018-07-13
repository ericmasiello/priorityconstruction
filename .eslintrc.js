module.exports = {
  extends: ['airbnb', 'prettier'],
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
    'function-paren-newline': 'off',
    'arrow-parens': 'off',
    'react/no-danger': 'off',
    'import/no-named-as-default': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-for': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/require-default-props': 'off',
  },
};
