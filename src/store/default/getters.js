//export const isAuthorized = state => !!state.session.token

import symbols from '@/store/default/symbols'

export default {
  [symbols.getters.isAuthorized] (state) {
    return !!state.session.token
  },

  [symbols.getters.locale] (state) {
    return state.shared.locale
  }

}
