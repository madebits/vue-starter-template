import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'
import state from './state'
import actions from './default/actions'
import mutations from './default/mutations'
import getters from './default/getters'
import someModule from './someModule'
import storeLocalSync from './storeLocalSync'
import storeWatchers from './storeWatchers'
import symbols from '@/store/default/symbols'

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
      paths: ['shared'],
      filter: mutation => mutation.type !== symbols.mutations.storeLocalSync
    }),
    createPersistedState({
      paths: ['cached'],
      storage: window.sessionStorage
    }),
    storeLocalSync, // sync shared state between tabs
    storeWatchers // deal with reactivity
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
