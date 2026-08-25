module.exports = {
  plugins: {
    'postcss-import': {},
    
    'postcss-nested': {},

    tailwindcss: {},
    
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': false 
      }
    },
    
    autoprefixer: {},
  },
};