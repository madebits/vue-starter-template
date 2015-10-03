import './main.scss'
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import i18n from '@/common/i18n'
import log from '@/common/logger'
import '@/common/httpInterceptors'
import appStart from '@/appStart'

Vue.config.productionTip = !DEBUG
if (!DEBUG) {
  Vue.config.errorHandler = function (err, vm, info) {
    log.error(err)
    if (info) log.info(info)
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

log.debug('test', 1, 2)

appStart()
