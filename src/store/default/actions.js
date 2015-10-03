import http from 'axios'
import Config from '@/common/Config'
import symbols from '@/store/default/symbols'
import i18n from '@/common/i18n'
import logger from '@/common/logger'
import loginActions from './loginActions'

export default Object.assign(
  {
    async [symbols.actions.loadData]({ commit }) {
      const data = await http.get(Config.backendUrl('/data'))
      commit(symbols.mutations.loadData, data.data)
    },

    async [symbols.actions.locale]({ commit, state }, locale) {
      try {
        locale = locale || state.shared.locale || 'en-US'
        let message = i18n.getLocaleMessage(locale)
        if (!message || !message.locale) {
          const result = await http.get(Config.backendUrl('/locale'), {
            params: {
              locale: locale
            }
          })
          message = result.data
        }
        if (message.locale !== i18n.locale) {
          i18n.setLocaleMessage(locale, message)
        }
        commit(symbols.mutations.locale, locale)
      } catch (e) {
        logger.error(e)
      }
    }
  },
  loginActions
)
