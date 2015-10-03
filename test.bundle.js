const Vue = require('vue').default
Vue.config.productionTip = false

let context = require.context('./src', true, /.+\.spec\.js$/)
context.keys().forEach(context)
module.exports = context
