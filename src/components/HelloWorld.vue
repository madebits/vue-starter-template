<template>
  <div class="m-3">
    <router-view/>
    <BsModal id="modalSample" @shown="this.onShow" @hidden="this.onHide">
        <div class="modal-header">
          <h5 class="modal-title">
            Vue Test
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          How are you today?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="this.onOk">Ok</button>
        </div>
    </BsModal>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalSample">
    Launch demo modal
    </button>
  </div>
</template>

<script>
import symbols from '@/store/default/symbols'
import log from '@/common/logger'
import BsModal from '@/components/shared/BsModal'

export default {
  name: 'HelloWorld',
  data() {
    return {
      currentUserIdx: 0,
      confirmed: false
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
  methods: {
    onOk() {
      this.confirmed = true
    },
    onShow() {
      this.confirmed = false
      log.debug('dialog is shown')
    },
    onHide() {
      log.debug('dialog is hidden', this.confirmed)
    }
  },
  components: { BsModal }
}
</script>
