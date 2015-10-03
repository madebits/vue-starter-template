export default class Config {
  static backendUrl(url) {
    url = url || ''
    return (globalAppConfig.backendUrl + url).replace(/([^:]\/)\/+/g, '$1')
  }
}
