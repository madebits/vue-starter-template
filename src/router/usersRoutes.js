import UserCarousel from '@/components/users/UserCarousel'

export default [
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
