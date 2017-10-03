import http from 'axios'
import store from '@/store'
import symbols from '@/store/default/symbols'
import log from '@/common/logger'

http.interceptors.request.use(
  function(config) {
    if (store.getters.isAuthorized) {
      config.headers.common['Authorization'] = `Bearer ${
        store.state.session.token
      }`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    if (error && error.response && error.response.status === 401) {
      log.debug('relogin required')
      store.dispatch(symbols.actions.relogin)
    }
    return Promise.reject(error)
  }
)
