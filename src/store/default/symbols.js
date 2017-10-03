// trick to use variables in place of string
// add new vuex symbols as class null properties
import SymbolsBase from '@/store/SymbolsBase'

/* eslint-disable no-useless-constructor */

class Common extends SymbolsBase {
  constructor() {
    super()
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
    this.relogin = null
  }
}

class Mutations extends Common {
  constructor() {
    super()
  }
}

class Getters extends SymbolsBase {
  constructor() {
    super()
    this.isAuthorized = null
  }
}

class Symbols extends SymbolsBase {
  constructor() {
    super(false) // has to be false here
    this.actions = new Actions()
    this.mutations = new Mutations()
    this.getters = new Getters()
  }
}

export default new Symbols()
