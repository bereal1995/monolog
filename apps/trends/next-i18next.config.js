const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
  },
  fallbackLng: {
    default: ['ko'],
  },
  localePath: path.resolve('./public/locales'),
}
