import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import AppError from '@/components/AppError'
import AppAbout from '@/components/about'
import UserCarousel from '@/components/users/UserCarousel'

export default {
  routes: [
    {
      path: '/',
      component: HelloWorld,
      children: [
        {
          path: 'current/:id',
          name: 'CurrentUser',
          component: UserCarousel,
          props: true
        },
        {
          path: '',
          redirect: { name: 'CurrentUser', params: { id: 0 } }
        }
      ]
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
