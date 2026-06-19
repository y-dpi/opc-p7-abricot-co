import stylistic from '@stylistic/eslint-plugin';
import jsonc from 'eslint-plugin-jsonc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import * as jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([

  // Next.js
  ...nextVitals,
  ...nextTs,

  // Override default ignores.
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'node_modules/**',
    '*.d.ts',
  ]),

  // TypeScript / TSX constraints.
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@stylistic': stylistic,
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@typescript-eslint/no-floating-promises': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // JSON / JSONC constraints.
  {
    files: ['**/*.json'],
    plugins: { jsonc },
    languageOptions: { parser: jsoncParser },
    rules: {
      'jsonc/indent': ['error', 2],
    },
  },
]);

export default eslintConfig;
