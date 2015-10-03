// trick to use variables in place of string
// add new vuex symbols as class null properties
import SymbolMapper from '@/store/SymbolMapper'

/* eslint-disable no-useless-constructor */

class Common {
  constructor() {
    this.login = null
    this.loadData = null
    this.locale = null
  }
}

class Actions extends Common {
  constructor() {
    super()
    this.loadData = null
    this.logout = null
    this.refreshAuthToken = null
  }
}

class Mutations extends Common {
  constructor() {
    super()
  }
}

class Getters {
  constructor() {
    this.isAuthorized = null
  }
}

export default new SymbolMapper({
  actions: new Actions(),
  mutations: new Mutations(),
  getters: new Getters()
})
