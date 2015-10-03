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
  async created() {
    //TODO better handle errors here
    try {
      await this.$store.dispatch(symbols.actions.loadData)
    } catch (e) {
      logger.error(e)
    }
  }
}
</script>
