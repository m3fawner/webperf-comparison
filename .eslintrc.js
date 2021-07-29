module.exports = {
  settings: {
    'import/resolver': {
      webpack: { config: 'webpack.config.js' },
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  ecmaFeatures: {
    jsx: true,
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
