<template>
<div class="text-center">
    <div class="card border-0 m-2 mx-auto">
      <img class="card-img-top img-fluid w-25 m-2 mx-auto d-block" :src="photo">
      <div class="card-body">
        <h4 class="card-title">{{name}}</h4>
        <p class="card-text">{{cv}}</p>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'UserItem',
  props: ['name', 'photo', 'cv'],
  data() {
    return {}
  }
}
</script>

