module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'custom',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'unused-imports'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'off',
    'react/no-unescaped-entities': 'off',
    'no-unused-vars': 'off',
    'import/order': [
      'error',
      { 'newlines-between': 'always-and-inside-groups' }
    ]
  }
}
