<template>

<div class="jumbotron m-0">
  <h1 class="display-3">About {{ vueStarter }} {{ template }}</h1>
  <p class="lead"><img class="img-fluid rounded" src="./logo.png"> Sample Vue Application</p>
  <hr class="my-4">
  <p id="about-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo similique adipisci maiores veniam. Excepturi alias culpa quasi incidunt accusantium odio harum iusto, voluptas provident doloribus modi atque cum eos porro.</p>
</div>
</template>
<script>
export default {
  computed: {
    vueStarter() {
      return this.$store.state.someModule.vueStarter
    },
    template() {
      return this.$store.state.template
    }
  }
}
</script>

<style scoped>
#about-text {
  font-style: italic;
  color: blue;
}
</style>
