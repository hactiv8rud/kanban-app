<template>
  <div>
    <div id="notification-container" v-if="error">
          <ErrorMessage :message="message" ref="error"></ErrorMessage>
    </div>
    <div id="login-page" class="">
        <div class="register-login-content center-viewport">
            <div class="login-image-container">
                <img class="kanban-logo-login" src="../assets/kanban-logo.svg" alt="kanban board" width="250">
            </div>
            <div class="form-container-login">
                <div class="login-form-title">
                  <img src="../assets/Kanban.svg" width="230">
                </div>
                <form @submit.prevent="login" id="login-form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="userLogin.email" type="email" class="form-control" id="login-email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="userLogin.password" type="password" class="form-control" id="login-password" name="password" required>
                    </div>
                    <div class="login-btn-container">
                        <button class="btn mb-2" id="login-login-btn">Log in</button>
                        <button @click="changePage('register-page')" type="button" class="btn mt-2 mb-2" id="login-register-btn">Register</button>
                        <!-- <p style="text-align:center;font-weight:500">or</p> -->
                        <!-- <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin> -->
                        <!-- <div id="g_id_onload"
                                    data-client_id="861795519447-99qjkijf9agup0r284t2mp7g3g7uu4d0.apps.googleusercontent.com"
                                    data-callback="handleCredentialResponse">
                        </div>
                        <div class="g_id_signin" data-type="standard" data-width="250" id="google-btn"></div> -->
                    </div>
                </form>
                <img class="users-img" src="../assets/users.svg" width="">
                <img class="soliloquy-img" src="../assets/soliloquy.svg" width="">
                <img class="talk1-img" src="../assets/talk1.svg" width="">
                <img class="talk3-img" src="../assets/talk3.svg" width="">
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
export default {
  name: "LoginPage",
  data() {
    return {
      userLogin: {
        email: "",
        password: ""
      },
      error: false,
      message: "",
      // params: {
      //     client_id:
      // },
      // renderParams: {
      //     width: 250
      // }
    }
  },
  methods: {
    login(){
      axios({
        url: "http://localhost:3000/login",
        method: "POST",
        withCredentials: true,
        data: this.userLogin
        
      })
      .then(({data}) => {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("fullName", data.fullName);
          this.changePage("main-page");
          Swal.fire(
              'Logged In!',
              "Welcome!",
              'success'
          );
      })
      .catch((err) => {
          console.log(err);
          this.message = err.response.data.message;
          this.error = true;
          this.$nextTick(()=> {
             this.$refs.error.$el.scrollIntoView();
          });
      })
      .finally(() => {
          this.userLogin.email = "";
          this.userLogin.password = "";
      });
    },
    // handleCredentialResponse(googleUser) {
    //   var googleToken = googleUser.getAuthResponse().id_token;
    //   axios({
    //       url: "http://localhost:3000/googleLogin",
    //       method: "POST",
    //       withCredentials: true,
    //       data: {
    //           googleToken
    //       }
    //   })
    //   .then(({data}) => {
    //       localStorage.setItem("access_token", data.access_token);
    //       localStorage.setItem("fullName", data.fullName);
    //       Swal.fire(
    //           'Logged In!',
    //           "Welcome!",
    //           'success'
    //           )
    //       this.changePage("main-page");
    //   })
    //   .catch((err) => {
    //       console.log(err.response.data);
    //       console.log(err.response.status);
    //       console.log(err.response.headers);
    //   })
    // },
    changePage(pageName) {
      this.$emit("changePage", pageName);
    }
  },
  components: {
    ErrorMessage
  }
}
</script>
<style>
  
</style>