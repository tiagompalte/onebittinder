import ChatService from '../services/chat_service.js';
import MatchService from '../services/match_service.js';
import store from '../store'

export default {
  namespaced: true,

  state: {
    chats: [],
    matches: [],
    currentMatchId: null
  },

  mutations: {
    getChats(state) {
      ChatService.load().then(chats => {
        state.chats = chats;
      })
    },
    loadMatches(state) {
      MatchService.loadMyMatches().then(matches => {
        state.matches = matches;
      })
    },
    pushMessage(state, message) {
      state.chats.push(message);
    },
    setCurrentMatchId(state, match_id) {
      state.currentMatchId = match_id;
    },
  },

  actions: {
    getChats(context) {
      context.commit("getChats");
    },
    loadMatches(context) {
      context.commit("loadMatches");
    },
    pushMessage(context, { message }) {
      context.commit("pushMessage", message);
    },
    setCurrentMatchId(context, { match_id }) {
      context.commit("setCurrentMatchId", match_id)
    },
    sendMessage(context, { message }) {
      this.msg = {
        message: {
          match_id: context.state.currentMatchId,
          body: message
        }
      }

      ChatService.sendMessage(this.msg).then(data => {
        context.commit("pushMessage", data);
      }, () => {
        store.dispatch('Notification/alert', { type: 'danger', message: 'Falha ao enviar mensagem.' });
      });
    }
  }
}
