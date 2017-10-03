import * as test from 'vue-test-utils'
import Vuex from 'vuex'
import symbols from '@/store/default/symbols'
import HelloWorld from './HelloWorld'

const localVue = test.createLocalVue()
localVue.use(Vuex)

describe('HelloWorld.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = jasmine.createSpyObj('actions', [symbols.actions.loadData])
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  it('name is HelloWorld', () => {
    console.log(HelloWorld.name)
    expect(HelloWorld.name).toBe('HelloWorld')
  })

  it('html contains Launch', () => {
    const wrapper = test.shallow(HelloWorld, { store, localVue })
    expect(wrapper.html()).toContain('Launch')
    expect(actions[symbols.actions.loadData]).toHaveBeenCalled()
  })
})
