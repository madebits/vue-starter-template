<template>

<div id='login' class="jumbotron jumbotron-fluid m-0 p-3" >
  <h1><span class="text-info"><i class="fa fa-user-circle" aria-hidden="true"></i></span> {{ $t('login') }}</h1>
<form @submit.prevent="login">
  <div class="form-group">
    <label for="email">{{ $t('email') }}</label>
    <input v-model.trim="email" type="email" class="form-control" :placeholder="$t('email')">
  </div>
  <div class="form-group">
    <label for="password">{{ $t('password') }}</label>
    <input v-model.trim="password" type="password" class="form-control" :placeholder="$t('password')">
  </div>
  <button type="submit" class="btn btn-primary"><i class="fa fa-arrow-right" aria-hidden="true"></i> {{ $t('login') }}</button>
 </form>
 <p v-show="failed" class="text-danger p-2"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> {{$t('failed')}}</p>
</div>

</template>

<script>
import log from '@/common/logger'
import symbols from '@/store/default/symbols'

export default {
  name: 'Login',
  data() {
    return {
      email: 'test@example.com',
      password: 'password',
      failed: false
    }
  },
  methods: {
    login: async function() {
      try {
        this.failed = false
        await this.$store.dispatch(symbols.actions.login, {
          email: this.email,
          password: this.password,
          from: this.$route.query.from || '/'
        })
      } catch (e) {
        log.error(e)
        this.failed = true
      }
    }
  }
}
</script>
