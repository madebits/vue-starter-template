export default class Timer {
  constructor(callback, timeMls = 0, repeat = false, timerProvider = null) {
    this._timerProvider = timerProvider || {}
    const bindDefault = function(fnName) {
      if (!this._timerProvider[fnName]) {
        this._timerProvider[fnName] = window[fnName]
        this._timerProvider[fnName] = this._timerProvider[fnName].bind(window)
      }
    }.bind(this)

    ;[
      'setTimeout',
      'clearTimeout',
      'setInterval',
      'clearInterval'
    ].forEach(_ => {
      bindDefault(_)
    })

    this._timeMls = timeMls
    this._callback = callback
    this._repeat = repeat

    this._handleTimer = 0
    this._handleInterval = 0
    this._callCount = 0

    const _this = this
    const cb = function() {
      _this._callCount++
      _this.callback(_this)
      if (!_this._repeat) {
        _this._handleTimer = 0
      }
    }

    if (this._repeat) {
      this._handleInterval = this._timerProvider.setInterval(cb, timeMls)
    } else {
      this._handleTimer = this._timerProvider.setTimeout(cb, timeMls)
    }
  }

  clear() {
    if (this._handleInterval !== 0) {
      this._timerProvider.clearInterval(this._handleInterval)
      this._handleInterval = 0
    }
    if (this._handleTimer !== 0) {
      this._timerProvider.clearTimeout(this._handleTimer)
      this._handleTimer = 0
    }
  }

  get timeMls() {
    return this._timeMls
  }

  get callback() {
    return this._callback
  }

  get isOnce() {
    return !this._repeat
  }

  get callCount() {
    return this._callCount
  }

  static once(callback, timeMls = 0, timerProvider = null) {
    return new Timer(callback, timeMls, false, timerProvider)
  }

  static repeat(callback, timeMls = 0, timerProvider = null) {
    return new Timer(callback, timeMls, true, timerProvider)
  }
}
