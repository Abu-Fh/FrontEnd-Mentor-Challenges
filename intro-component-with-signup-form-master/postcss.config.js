module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-mixins')(),
    require('tailwindcss/nesting')(),
    require('tailwindcss')(),
    require('postcss-preset-env')({
      stage: 2,
      features: {
        'custom-media-queries': true
      }
    }),
    require('postcss-sort-media-queries')(),

    ...(process.env.NODE_ENV === 'production' ? [require('cssnano')()] : [])
  ]
};