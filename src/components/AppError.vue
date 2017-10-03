<template>
  <div class="m-5">
    <p class="text-danger">Something went wrong!</p>
    <p>{{ lastError }}</p>
    <p>Go to
      <router-link to="/">Home</router-link> page.</p>
  </div>
</template>

<script>
export default {
  props: ['error'],
  computed: {
    lastError() {
      return this.error || this.$store.lastError
    }
  }
}
</script>
