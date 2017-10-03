import * as test from 'vue-test-utils'
import UserItem from './UserItem'

describe('UserItem.vue', () => {
  it('Name is rendered', function() {
    const wrapper = test.mount(UserItem, {
      propsData: {
        name: 'Vasian',
        photo: '123',
        cv: '456'
      }
    })
    expect(wrapper.html()).toContain('Vasian')
  })
})
