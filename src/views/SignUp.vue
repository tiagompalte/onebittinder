<template>
  <div>  
    <div class="columns is-centered is-mobile login-area">
      <div class="column is-5-desktop is-11-mobile">
        <h1 class="title has-text-centered">Cadastro</h1>
        <div class="card">
          <div class="card-content">
            <form @submit.prevent="signUp(name, email, password, passwordConfirmation, photoToUpload)">

              <div class="has-text-centered">
                <img v-if="photoPreviewURL" :src="photoPreviewURL" alt="preview"/>
                <img v-else src="@/assets/default-photo.png" alt="default"/>
              </div>

              <b-field class="file is-centered">
                <b-upload v-model="photoToUpload">
                  <a class="button is-primary">
                    <b-icon icon="camera" pack="fas" size="is-small"></b-icon>
                    <span>Adicionar nova foto</span>
                  </a>
                </b-upload>
              </b-field>

              <b-field label="Nome">
                <b-input v-model="name" type="text"></b-input>
              </b-field>

              <b-field label="Email" :type="getTypeOf('email')" :message="getErrorMessageOf('email')">
                <b-input v-model="email" type="email"></b-input>
              </b-field>

              <b-field label="Senha" :type="getTypeOf('password')" :message="getErrorMessageOf('password')">
                <b-input v-model="password" type="password"></b-input>
              </b-field>

              <b-field label="Confirmação de Senha" :type="getTypeOf('passwordConfirmation')" 
                                                    :message="getErrorMessageOf('passwordConfirmation')">
                <b-input v-model="passwordConfirmation" type="password"></b-input>
              </b-field>
              
              <input type="submit" class="button is-fullwidth is-success" value="Cadastrar">
            </form>

            <div class="has-text-centered">
              <router-link class="button is-text has-text-primary" to="/login">Já tenho uma conta</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  div.login-area {
    margin-top: 7%;
  }
</style>


<script>

import AccountService from '../services/account_service';
import router from '../router';
import store from '../store';
import PhotoService from '../services/photo_service';

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: {
        email: [],
        password: [],
        passwordConfirmation: []
      },
      photoToUpload: null,
      photoPreviewURL: '',
    }
  },

  watch: {
    photoToUpload(newValue) {
      if(newValue) {
        this.photoPreviewURL = URL.createObjectURL(newValue);
      }
    }
  },

  methods: {
    signUp(name, email, password, passwordConfirmation, photoToUpload) {
      AccountService.signUp(name, email, password, passwordConfirmation).then(resp => {
        PhotoService.addPhotoInSignUp(photoToUpload, email, resp.authentication_token).then(() => {
          router.push("/login");
          store.dispatch('Notification/alert', { type: 'success', message: "Cadastro realizado com sucesso" });
        });
      }, (error) => {
        if(error.response) this.errors = error.response.data.errors;
      });
    },

    getTypeOf(key) {
      if(!this.errors[key] || this.errors[key].length <= 0) return "";
      return 'is-danger';
    },

    getErrorMessageOf(key) {
      if(this.errors[key] && this.errors[key].length > 0) return this.errors[key].join(" | ");
      return "";
    }
  }
}

</script>