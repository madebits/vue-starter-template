const Vue = require('vue').default
Vue.config.productionTip = false
Vue.config.devtools = false
//Vue.config.debug = false
//Vue.config.silent = true

let context = require.context('./src', true, /.+\.spec\.js$/)
context.keys().forEach(context)
module.exports = context
