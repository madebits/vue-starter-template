<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import BootstrapModal from '@/common/BootstrapModal'

export default {
  name: 'BsModal',
  props: {
    options: {
      type: Object,
      default() { return {} }
    }
  },
  data() {
    return {
      modal: null
    }
  },
  mounted() {
    this.modal = new BootstrapModal(this.$el, this.options || {})
    const self = this
    this.modal.on(function(e) {
      self.$emit(e.type, { component: self, event: e })
    })
  },
  beforeDestroy() {
    if (this.modal) {
      this.modal.dispose()
    }
  },
  methods: {
    show() {
      if (this.modal) this.modal.show()
    },
    hide() {
      if (this.modal) this.modal.hide()
    },
    toggle() {
      if (this.modal) this.modal.toggle()
    }
  }
}
</script>
