<template>
  <section class="section">
    <div class="message-container">
      <!--MENSAGENS-->
      <div v-for="message in chat.messages" :key="message.id">
        <div class="columns is-mobile is-vcentered is-multiline message" 
              v-bind:class="[message.me ? 'sender' : 'receiver']">  
          <div class="column is-one-fifth-mobile is-1-tablet photo">
            <div v-if="message.avatar">
              <img :src="message.avatar" alt="user">
            </div>
            <div v-else>
              <i class="fas fa-paw has-text-write-ter fa-2x"></i>
            </div>
          </div>

          <div class="column is-11-table is-four-fifth-mobile details">
            <div class="columns is-multiline">
              <div class="column is-full content">
                {{message.body}}
              </div>

              <div class="column is-full date">
                {{message.timestamp | formatDate}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--CAMPO DE ENVIO-->
      <footer class="send-message has-background-black">
        <div class="container">
          <form>
            <div class="columns is-mobile is-vcentered">
              <div class="column is-four-fifths">
                <div class="fields">
                  <textarea class="textarea" rows="1" style="resize: none" v-model="message"></textarea>
                </div>
              </div>
              <div class="column is-one-fifth has-text-centered">
                <button class="button is-info is-rounded has-text-white-ter" v-on:click="sendMessage">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </footer>

    </div>
  </section>
</template>

<style lang="scss" scoped>

div.columns.message {
  margin-bottom: 1rem;
  background-color: transparent;

  div.column {
    margin: 0;

    &.date {
      padding: 0;
      font-size: 8pt;
    }
  }

  &.sender {
    flex-direction: row-reverse;

    div.column {
      &.content {
        color: $grey-darker;
        background-color: #99FF99;
      }

      &.date {
        text-align: right;        
      }
    }
  }

  &.receiver {
    div.column.content {
      color: $black-ter;
      background-color: #209cee
    }
  }
}

.message-container {
  width: 100%;
  overflow: auto;
}

footer.send-message {
  position: fixed;
  z-index: 9999;
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 10px;

  textarea {
    height: 80px;
    font-size: 12pt;
  }
}
</style>

<script>
  import store from '../store';
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        message: "",
        chat: {}
      }
    },
    mounted() {
      this.currentChat(this.chats, this.currentMatchId);
    },
    computed: {
      ...mapState('Message', {
        chats: state => state.chats,
        currentMatchId: state => state.currentMatchId
      })
    },
    watch: {
      chats: function(newValue) {
        if (!this.chat || !this.chat.messages) {
          this.chat = newValue[0];
        } else {
          this.chat.messages.push(newValue[newValue.length - 1].messages[0]); 
        }
      }
    },
    methods: {
      currentChat(chats, currentMatchId) {        
        this.chat = chats.filter(c => c.match_id == currentMatchId)[0] || {};
      },
      sendMessage(event) {
        event.preventDefault();
        store.dispatch('Message/sendMessage', { message: this.message }).then(() => {
          this.message = "";
        });
      }
    }
  }
</script>