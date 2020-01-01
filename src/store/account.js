import AccountService from '../services/account_service';

export default {
  state: {
    account: ""
  },

  mutations: {
    performLogin(state, user) {
      state.account = user;
      localStorage.setItem('account', JSON.stringify(user));
    },

    loadLocalStorageAccount(state) {
      let account = localStorage.getItem('account');
      if(account) {
        state.account = JSON.parse(account);
      } else {
        state.account = "";
      }
    },

    update(state, user) {
      user.authentication_token = state.account.authentication_token;
      user.email = state.account.email;
      state.account = user;
      localStorage.setItem('account', JSON.stringify(user));
    }
  },

  actions: {
    login(context, { email, password }) {
      AccountService.login(email, password).then(user => {
        context.commit("performLogin", user)
      })
    },

    loadLocalAccount(context) {
      context.commit("loadLocalStorageAccount");
    },

    updateAccount({ commit, state }, { name, college, company, description }) {
      AccountService.update(state.account.id, name, college, company, description).then(user => {
        commit("update", user)
      })
    }
  },

  getters: {
    isLoggedIn(state) {
      return state.account != ""
    },
    accountHeaders(state) {
      return { 'X-User-Email': state.account.email, 'X-User-Token': state.account.authentication_token }
    }
  }
}