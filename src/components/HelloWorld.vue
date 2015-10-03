<template>
  <div class="m-3">
    <router-view/>
    <ConfirmBox id="modalSample">
      <span slot="title">Hello Vue</span>
      How are you?
    </ConfirmBox>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalSample">
    Launch demo modal
    </button>
  </div>
</template>

<script>
import symbols from '@/store/default/symbols'
import log from '@/common/logger'
import ConfirmBox from '@/components/shared/ConfirmBox'

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
      log.error(e)
    }
  },
  components: { ConfirmBox }
}
</script>
