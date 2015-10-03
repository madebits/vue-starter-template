import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import log from '@/common/logger'
import routes from './routes'

Vue.use(Router)

const router = new Router(routes)

router.beforeEach((to, from, next) => {
  const isLogin = to.name === 'Login'
  const needsAuthorization = !to.matched.every(record => record.meta.noAuth)
  if (needsAuthorization) {
    if (store.getters.isAuthorized) {
      if (isLogin) {
        next({ path: to.query.from || '/' })
      } else {
        next()
      }
    } else {
      if (!isLogin) {
        next({ path: '/login?from=' + to.path })
      } else {
        next()
      }
    }
  } else {
    if (isLogin && store.getters.isAuthorized) {
      next({ path: to.query.from || '/' })
    } else {
      next()
    }
  }
})

router.onError(err => log.error(err))

export default router
