const path = require('path');

module.exports = {
  head: {
    titleTemplate: title => (title) ? `${title} - Bredik v2` : 'Bredik v2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    htmlAttrs: {
      lang: 'ru',
    }
  },
  modules: [
    [
      'nuxt-sass-resources-loader', [
      'assets/scss/variables.scss',
      'assets/scss/global.scss'
    ]
    ]
  ],

};