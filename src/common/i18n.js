import Vue from 'vue'
import VueI18n from 'vue-i18n'
import defaultLocale from './defaultLocale'

const originalSetLocaleMessage = VueI18n.prototype.setLocaleMessage
VueI18n.prototype.setLocaleMessage = function(locale, messages) {
  // workaround
  this.locale = ''
  this.locale = locale
  originalSetLocaleMessage.call(this, locale, messages)
}

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: defaultLocale.locale,
  messages: { [defaultLocale.locale]: defaultLocale },
  fallbackLocale: defaultLocale.locale,
  silentTranslationWarn: true
})

i18n.defaultLocale = defaultLocale.locale

if (module.hot) {
  module.hot.accept(['./defaultLocale'], function () {
    const d = require('./defaultLocale')
    i18n.setLocaleMessage(d.locale, d)
  })
}

export default i18n
