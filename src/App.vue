<template>
  <div id="app">
    <Navbar />
    <Alert />
    <router-view/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import router from './router';
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";

export default {
  components: {
    Navbar,
    Alert
  },

  computed: {
    ...mapGetters(['isGeolocationEnabled'])
  },

  watch: {
    isGeolocationEnabled(newValue) {
      if(newValue) router.push('/');
    }
  }
}
</script>