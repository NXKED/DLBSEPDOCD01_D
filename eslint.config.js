import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.js'],
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'prefer-const': 'error',
    },
  },
])
