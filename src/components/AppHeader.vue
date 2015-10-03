<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <router-link tag="span" to="/">
  <a class="navbar-brand" href="#"><i class="fa fa-jsfiddle" aria-hidden="true"></i> VueStarter <sup><span class="badge badge-pill badge-light">{{ $t('template') }}</span></sup></a>
  </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <!--
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
      -->
      <li class="nav-item">
        <router-link tag="span" to="/about">
          <a class="nav-link" href="#"><i class="fa fa-info-circle" aria-hidden="true"></i> {{$t('about')}}</a>
        </router-link>
      </li>
    </ul>
    <ul class="navbar-nav mr-sm-2">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-language" aria-hidden="true"></i> {{$t('language')}}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a v-for="locale in locales" @click="setLocale(locale)" :key="locale" class="dropdown-item" href="#">{{locale}}</a>
        </div>
      </li>
      <li v-if="isAuthorized" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-user-circle" aria-hidden="true"></i> {{$t('user')}}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a @click="logout" class="dropdown-item" href="#">{{$t('logout')}}</a>
            </div>
        </li>
    </ul>

  </div>
</nav>



</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import symbols from '@/store/default/symbols'

export default {
  data: function() {
    return {
      locales: ['en-US', 'de-DE']
    }
  },
  computed: {
    ...mapGetters([symbols.getters.isAuthorized])
  },
  methods: {
    ...mapActions([symbols.actions.logout]),
    setLocale: function(locale) {
      this.$store.dispatch(symbols.actions.locale, locale)
    }
  }
}
</script>
