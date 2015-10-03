export default {
  session: { // any data here is put into a shared session cookie
    token: null,
    refreshToken: null
  },
  shared: { // any data here is put in local storage
    locale: 'en-US'
  },
  cached: { // any data here is put in session storage
    data: {}
  },
  // rest of data is in page memory
  lastError: null
}
