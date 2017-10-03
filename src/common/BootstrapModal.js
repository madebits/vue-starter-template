import Modal from 'bootstrap/js/src/modal'

export default class BootstrapModal {
  constructor(element, options = {}) {
    this.element = element
    this.modal = new Modal(this.element, options)
    /* eslint-disable no-undef */
    this._element = $(this.element)
  }

  dispose() {
    this.modal.dispose()
    return this
  }

  show() {
    this.modal.show()
    return this
  }

  hide() {
    this.modal.hide()
    return this
  }

  toggle() {
    this.modal.toggle()
    return this
  }

  on(callBack) {
    ;['show', 'shown', 'hide', 'hidden'].forEach(_ => {
      this._element.on(`${_}.bs.modal`, callBack)
    })
    return this
  }
}
