import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import ActionCableVue from 'actioncable-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './registerServiceWorker';


Vue.use(Buefy);
Vue.use(ActionCableVue, { debug: true, debugLevel: 'error', connectionUrl: process.env.VUE_APP_WS })

axios.defaults.baseURL = `${process.env.VUE_APP_API}/api/v1`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');