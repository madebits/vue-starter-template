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

export default new Logger()
