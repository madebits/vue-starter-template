import symbols from '@/store/default/symbols'
import log from '@/common/logger'

export default store => {
  window.addEventListener('storage', event => {
    if (event.key !== 'vuex') return
    try {
      const data = JSON.parse(event.newValue)
      store.commit(symbols.mutations.storeLocalSync, data.shared)
    } catch (e) {
      log.error(e)
    }
  })
}
