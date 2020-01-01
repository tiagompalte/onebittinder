import Vue from 'vue'
import Vuex from 'vuex'
import Account from './account'
import Notification from './notification'
import Match from './match'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Account,
    Notification,
    Match
  }
})
