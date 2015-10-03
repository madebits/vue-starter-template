import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import AppError from '@/components/AppError'
import AppAbout from '@/components/about'
import usersRoutes from './usersRoutes'

export default {
  routes: [
    {
      path: '/',
      component: HelloWorld,
      children: usersRoutes
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { noAuth: true }
    },
    {
      path: '/about',
      name: 'About',
      component: AppAbout,
      meta: { noAuth: true }
    },
    {
      path: '*',
      name: 'error',
      component: AppError
    }
  ]
}
