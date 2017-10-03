class ProxyHandler {
  constructor(hasSymbols = true) {
    this.isLeafObject = hasSymbols
  }
  get(target, name) {
    const present = name in target
    if (present) return this.isLeafObject ? name : target[name]
    throw new Error(`undefined symbol: ${name}`)
  }
}

// https://stackoverflow.com/questions/37714787/can-i-extend-proxy-with-an-es2015-class
class SymbolsBase {
  constructor(hasSymbols = true) {
    return new Proxy(this, new ProxyHandler(hasSymbols))
  }
}

export default SymbolsBase
