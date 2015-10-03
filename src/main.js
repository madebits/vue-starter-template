import './main.scss'
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import i18n from '@/common/i18n'
import '@/common/httpInterceptors'
import symbols from '@/store/default/symbols'
import logger from '@/common/logger'
import Timer from '@/common/Timer'

Vue.config.productionTip = !DEBUG
if (!DEBUG) {
  Vue.config.errorHandler = function(err, vm, info) {
    logger.error(err)
    if (info) logger.info(info)
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})

store.dispatch(symbols.actions.locale)
Timer.repeat(() => {
  store.dispatch(symbols.actions.refreshAuthToken).catch(() => {
    store.dispatch(symbols.actions.logout)
  })
}, 1000 * 60 * 30) // 30 minutes

logger.info('app started')
