<template>
  <div class="m-3">
    <router-view/>
  </div>
</template>

<script>
import symbols from '@/store/default/symbols'
import logger from '@/common/logger'

export default {
  name: 'HelloWorld',
  data() {
    return {
      currentUserIdx: 0
    }
  },
  // computed: {
  //   someData: function() {
  //     return this.$store.state.cached.data
  //   }
  // },
  async created() {
    //TODO better handle errors here
    try {
      await this.$store.dispatch(symbols.actions.loadData)
      //this.$router.push({ name: 'CurrentUser', params: { id: 0 } })
    } catch (e) {
      logger.error(e)
    }
  }
  // components: {
  //   'user-item': UserItem
  // }
}
</script>
