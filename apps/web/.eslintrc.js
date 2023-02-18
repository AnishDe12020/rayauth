const prettierConfig = require('./.prettierrc.js');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'dot-notation': 'error',
    'no-else-return': 'warn',
    'no-floating-decimal': 'warn',
    'no-sequences': 'error',
    'array-bracket-spacing': 'warn',
    'computed-property-spacing': ['warn', 'never'],
    curly: 'warn',
    'no-lonely-if': 'warn',
    'no-unneeded-ternary': 'warn',
    'one-var-declaration-per-line': 'warn',
    quotes: [
      'warn',
      'single',
      {
        allowTemplateLiterals: false,
        avoidEscape: true,
      },
    ],
    'array-callback-return': 'off',
    'prefer-const': 'error',
    'import/prefer-default-export': 'off',
    'no-unused-expressions': 'off',
    'no-prototype-builtins': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/href-no-hash': [0],
    'react/display-name': 0,
    'react/no-deprecated': 'error',
    'react/no-unsafe': [
      'error',
      {
        checkAliases: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 0,

    'prettier/prettier': ['warn', prettierConfig],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
