module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    'unused-imports', // Auto remove unused imports
    'sort-imports-es6-autofix', // Auto sort the import order
    'prettier',
  ],
  extends: [
    // NestJS default extends
    'plugin:@typescript-eslint/recommended',
    // Airbnb-base depended plugin
    'plugin:import/recommended',
    // Support TypeScript [Import]
    'plugin:import/typescript',
    'airbnb-base',
    // Support TypeScript [Airbnb]
    'airbnb-typescript/base',
    // IMPORTANT: add this to the last of the extends to override ESLint rules
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // NestJS default rules
    '@typescript-eslint/interface-name-prefix': 'off',
    // NestJS default rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    // NestJS default rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // NestJS default rules
    '@typescript-eslint/no-explicit-any': 'off',
    // to avoid line ending issues in windows & linux (LF vs CRLF)
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    // prefer template string over concat string
    'prefer-template': 'error',
    curly: ['error', 'all'],
    'no-trailing-spaces': 'error',
    'lines-between-class-members': 'error',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id', '_default'],
      },
    ],

    '@typescript-eslint/naming-convention': 'off', // disable the rule for now due to _id not being allowed
    // Example setting of unused-imports plugin
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // Conflict with sort-imports-es6 plugin
    'import/order': 'error',

    // Example setting of sort-imports-es6 plugin
    'sort-imports-es6-autofix/sort-imports-es6': [
      'warn',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    // Not enforce using 'this' in a class function since some function can be a pure function
    'class-methods-use-this': 'off',

    // For Typescript, it is better not to use default export: https://stackoverflow.com/a/33307487/11440474
    'import/prefer-default-export': 'off',

    // Conflict with alias path
    'import/extensions': 'off',

    'no-param-reassign': ['error', { props: false }],
  },
};
