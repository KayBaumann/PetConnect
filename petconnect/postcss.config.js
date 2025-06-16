const purgecss = require('@fullhuman/postcss-purgecss').default;
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    purgecss({
      content: ['./index.html', './src/**/*.{vue,js,ts}'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: [/^dark-mode/, /^btn/, /^cta-button/, /^form-container/, /^advertisement/],
      },
    }),
    cssnano({ preset: 'default' }),
  ],
};
