<template>
  <div id="app">
    <AppHeader/>
    <router-view/>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import symbols from '@/store/default/symbols'
import Timer from '@/common/Timer'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter
  },
  created() {
    this.$store.dispatch(symbols.actions.locale)
    const self = this
    Timer.repeat(() => {
      self.$store.dispatch(symbols.actions.refreshAuthToken).catch(() => {
        self.$store.dispatch(symbols.actions.logout)
      })
    }, 1000 * 60 * 30) // 30 minutes

    this.$log.info('app started')
  }
}
</script>

<style scoped>
/* #app {
  text-align: center;
} */
</style>
