export default class SymbolMapper {
  constructor(map, prefix = '') {
    Object.keys(map).forEach(_ => {
      this[_] = SymbolMapper._mapper(map[_], prefix)
    })
  }

  static _mapper(obj, prefix) {
    if (!obj) return obj
    Object.keys(obj).forEach(_ => {
      obj[_] = prefix + _
    })
    return obj
  }
}
