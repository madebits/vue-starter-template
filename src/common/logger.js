/* eslint-disable no-console */
class Logger {
  error(error) {
    if (DEBUG) {
      console.error(error)
      console.trace('Error log stack follows:')
    }
  }

  info(message) {
    if (DEBUG) {
      console.log(message)
    }
  }

  warn(message) {
    if (DEBUG) {
      console.warn(message)
    }
  }
}

const logger = new Logger()

window.onerror = function(messageOrEvent, source, lineno, colno, error) {
  logger.error(new Error(`Unhandled: ${messageOrEvent || ''} ${error || ''}`, source || '?', lineno || 0))
}

export default logger
