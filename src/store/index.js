import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'
import state from './state'
import actions from './default/actions'
import mutations from './default/mutations'
import getters from './default/getters'
import someModule from './someModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: DEBUG,
  state,
  getters,
  actions,
  mutations,
  modules: { someModule },
  plugins: [
    createPersistedState({
      paths: ['session'],
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value), //session
        removeItem: key => Cookies.remove(key)
      }
    }),
    createPersistedState({
      paths: ['shared']
    }),
    createPersistedState({
      paths: ['cached'],
      storage: window.sessionStorage
    })
  ]
})

if (module.hot) {
  module.hot.accept(
    [
      './default/getters',
      './default/actions',
      './default/mutations',
      './someModule'
    ],
    () => {
      store.hotUpdate({
        getters: require('./default/getters').default,
        actions: require('./default/actions').default,
        mutations: require('./default/mutations').default,
        modules: { someModule: require('./someModule').default }
      })
    }
  )
}

export default store
