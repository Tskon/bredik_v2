module.exports = {
  head: {
    titleTemplate: function(title){
      return (title) ? `${title} - Bredik v2` : 'Bredik v2'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    htmlAttrs: {
      lang: 'ru',
    }
  },
  router: {
    linkActiveClass: 'menu-active',
    linkExactActiveClass: ''
  },
  css: [
    '@/assets/scss/variables.scss',
    '@/assets/scss/global.scss'
  ]

};