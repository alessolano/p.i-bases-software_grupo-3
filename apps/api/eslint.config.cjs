const js = require('@eslint/js')
const globals = require('globals')
const tseslint = require('typescript-eslint')
const { defineConfig, globalIgnores } = require('eslint/config')

module.exports = defineConfig([
  globalIgnores(['dist', 'coverage', '**/coverage']),
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts', 'test/**/*.ts'],
    languageOptions: {
      globals: globals.jest,
    },
  },
])