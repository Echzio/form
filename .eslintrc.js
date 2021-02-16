module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'eslint-config-prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'eslint-plugin-prettier', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'arrow-parens': [2, 'as-needed'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/no-unresolved': 0,
    'linebreak-style': 0,
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'no-extra-boolean-cast': 'off',
    'func-names': 'off',
    'prefer-rest-params': 'off',
    'no-unused-expressions': 'off',
  },
  settings: {
    'import/resolver': 'webpack',
  },
};
