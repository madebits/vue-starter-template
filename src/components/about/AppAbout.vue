<template>
  <div>
    <div class="jumbotron m-0">
      <h1 class="display-3">About {{ vueStarter }} {{ template }}</h1>
      <p class="lead"><img class="img-fluid rounded" src="./logo.png"> Sample Vue Application</p>
      <hr class="my-4">
      <p id="about-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo similique adipisci maiores veniam. Excepturi alias culpa quasi incidunt accusantium odio harum iusto, voluptas provident doloribus modi atque cum eos porro.</p>
      <button class="btn btn-primary" @click="showModal">Show Modal</button>
    </div>

    <!-- another way to work with modals -->
    <BsModal ref="modalSample" :options="{focus: false}">
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

  </div>
</template>

<script>
import BsModal from '@/components/shared/BsModal'

export default {
  computed: {
    vueStarter() {
      return this.$store.state.someModule.vueStarter
    },
    template() {
      return this.$store.state.template
    }
  },
  methods: {
    showModal() {
      this.$refs.modalSample.show()
    },
    onOk() {}
  },
  components: { BsModal }
}
</script>

<style lang="scss" scoped>
#about-text {
  font-style: italic;
  color: blue;
}
</style>
