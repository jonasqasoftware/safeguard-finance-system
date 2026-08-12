import js from '@eslint/js'

export default [
  { ignores: ['node_modules/**', 'coverage/**', '.npm-cache/**'] },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { console: 'readonly', process: 'readonly', Buffer: 'readonly' },
    },
  },
]
