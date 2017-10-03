import http from 'axios'
import Config from '@/common/Config'
import router from '@/router'
import symbols from '@/store/default/symbols'

export default {
  async [symbols.actions.login]({ commit, dispatch }, userData) {
    commit(symbols.mutations.login, null)
    const result = await http.post(Config.backendUrl('/login'), {
      email: userData.email,
      password: userData.password
    })
    commit(symbols.mutations.login, result.data)
    router.push(userData.from)
  },

  async [symbols.actions.refreshAuthToken]({ commit, state }) {
    const params = {
      token: state.session.token,
      refreshToken: state.session.refreshToken
    }
    if (!params.token || !params.refreshToken) {
      return
    }
    // TODO check if token needs refresh
    const result = await http.post(Config.backendUrl('/refreshToken'), params)
    commit(symbols.mutations.login, result.data)
  },

  [symbols.actions.logout]({ commit }) {
    commit(symbols.mutations.login, null)
    router.push({ name: 'Login' })
  },

  [symbols.actions.relogin]({ commit }) {
    commit(symbols.mutations.login, null)
    if (router.currentRoute.name === 'Login') {
      return
    }
    router.push(`/login?relogin=1&from=${router.currentRoute.fullPath}`)
  }
}
