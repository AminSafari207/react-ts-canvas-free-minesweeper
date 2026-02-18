module.exports = {
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 140,
  semi: false,
  endOfLine: 'auto',
  overrides: [
    {
      files: '**/*.json',
      options: {
        trailingComma: 'none',
      },
    },
  ],
  plugins: ['prettier-plugin-organize-imports'],
}
