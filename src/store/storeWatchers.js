import getters from './default/getters'
import symbols from '@/store/default/symbols'

export default store => {
  // use same language if propagated from other tabs
  store.watch(getters[symbols.getters.locale], (newValue, oldValue) => {
    store.dispatch(symbols.actions.locale, newValue)
  })
}
