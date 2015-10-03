<template>
<div class="container">
    <div class="row">
  <nav class="mx-auto">
  <ul class="pagination pagination-lg">
    <li class="page-item">
      <router-link tag="span" :to="`/current/${prevIdx}`">
        <a class="page-link" href="#"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
      </router-link>
      </li>
    <li class="page-item active">
      <span class="page-link">
        {{currentIdx}}
        <span class="sr-only">(current)</span>
      </span>
    </li>
    <li class="page-item">
      <router-link tag="span" :to="`/current/${nextIdx}`">
        <a class="page-link" href="#"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
      </router-link>
    </li>
  </ul>
</nav>
    </div>
  <UserItem :name="current.title" :photo="current.photo" :cv="current.details" />
</div>
</template>

<script>
import UserItem from './UserItem'

export default {
  props: [ 'id' ],
  name: 'UserCarousel',
  computed: {
    idx() {
      return parseInt(this.$props.id)
    },
    currentIdx() {
      return this.idx + 1
    },
    nextIdx() {
      const data = this.$store.state.cached.data
      if (data.length) {
        return (this.idx + 1) % data.length
      }
      return 0
    },
    prevIdx() {
      const data = this.$store.state.cached.data
      let previous = this.idx - 1
      if (data.length) {
        if (previous < 0) previous = data.length - 1
        return previous
      }
      return 0
    },
    current() {
      const data = this.$store.state.cached.data
      if (data.length && this.$props.id < data.length) {
        return data[this.$props.id]
      }
      return { title: '', photo: '', details: '' }
    }
  },
  components: {
    UserItem
  }
}
</script>
