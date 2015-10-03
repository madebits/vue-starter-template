/* eslint-disable no-console */
class Logger {
  error(error) {
    console.error(error)
    if (DEBUG) {
      console.trace('Error log stack follows:')
    }
    return this
  }

  info() {
    if (DEBUG) {
      console.log(...arguments)
    }
    return this
  }

  warn() {
    if (DEBUG) {
      console.warn(...arguments)
    }
    return this
  }

  debug() {
    if (DEBUG) {
      console.debug('#Debug:', ...arguments)
    }
    return this
  }
}

const logger = new Logger()

if (window) {
  window.onerror = function(messageOrEvent, source, lineno, colno, error) {
    logger.error(
      new Error(
        `Unhandled: ${messageOrEvent || ''} ${error || ''}`,
        source || '?',
        lineno || 0
      )
    )
  }
}

export default logger
