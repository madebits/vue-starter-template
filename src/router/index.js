import Vue from 'vue'
import Router from 'vue-router'
import log from '@/common/logger'
import routes from './routes'
import store from '@/store'

Vue.use(Router)

const router = new Router(routes)

router.beforeEach((to, from, next) => {
  const isRelogin = to.query.relogin === '1'
  if (isRelogin) {
    next({ path: `/login?from=${to.query.from || '/'}` })
    return
  }
  const needsAuthorization = !to.matched.every(record => record.meta.noAuth)
  if (needsAuthorization && !store.getters.isAuthorized) {
    next({ path: `/login?from=${to.path || '/'}` })
    return
  }
  next()
})

router.onError(err => log.error(err))

export default router
