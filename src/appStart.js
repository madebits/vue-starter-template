import store from '@/store'
import symbols from '@/store/default/symbols'
import Timer from '@/common/Timer'
import logger from '@/common/logger'

export default () => {
  store.dispatch(symbols.actions.locale)
  Timer.repeat(() => {
    store.dispatch(symbols.actions.refreshAuthToken).catch(() => {
      store.dispatch(symbols.actions.logout)
    })
  }, 1000 * 60 * 30) // 30 minutes

  logger.info('app started')
}
