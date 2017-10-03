import symbols from '@/store/default/symbols'

export default {
  [symbols.mutations.login](state, tokens) {
    state.session.token = tokens ? tokens.token : null
    state.session.refreshToken = tokens ? tokens.refreshToken : null
  },

  [symbols.mutations.loadData](state, data) {
    state.cached.data = data || {}
  },

  [symbols.mutations.locale](state, locale) {
    state.shared.locale = locale
  },

  [symbols.mutations.storeLocalSync](state, shared) {
    state.shared = shared
  }
}
