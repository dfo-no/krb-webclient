// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.json',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'cypress'
    // 'unused-imports',
    // 'node'
  ]
};
