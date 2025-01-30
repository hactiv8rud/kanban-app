<template>
  <div>
    <div id="notification-container" sv-if="error">
          <ErrorMessage v-for="(message, index) in messages" :key="index" :message="message" ref="error"></ErrorMessage>
    </div>
     <div id="register-page">
            <div class="register-login-content" id="register-content">
                <div class="register-image-container">
                    <img src="../assets/kanban-logo.svg" alt="kanban board" width="250">
                </div>
                <div class="form-container-register">
                    <div class="register-form-title">
                      <img src="../assets/Kanban.svg" width="230">
                    </div>
                    <form @submit.prevent="register" id="register-form">
                        <div class="form-group">
                            <label for="first_name">First Name</label>
                            <input v-model="userRegister.first_name" type="text" class="form-control" id="register-first_name" placeholder="John"
                                name="first_name">
                        </div>
                        <div class="form-group">
                            <label for="last_name">Last Name</label>
                            <input v-model="userRegister.last_name" type="text" class="form-control" id="register-last_name" placeholder="Doe"
                                name="last_name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input v-model="userRegister.email" type="email" class="form-control" id="register-email" placeholder="johndoe@mail.com"
                                name="email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input v-model="userRegister.password" type="password" class="form-control" id="register-password"
                                placeholder="minimum 6 characters" name="password">
                        </div>
                        <div class="register-btn-container">
                            <button type="submit" class="btn mt-2" id="register-submit-btn">Register</button>
                            <button @click="changePage('login-page')" type="button" class="btn mt-2" id="register-cancel-btn">Cancel</button>
                        </div>
                    </form>
                    <img class="users-img-reg" src="../assets/users.svg" width="">
                    <img class="planner-img" src="../assets/planner1.svg" width="">
                    <img class="talk2-img" src="../assets/talk2.svg" width="">
                    <img class="talk3-img-reg" src="../assets/talk3.svg" width="">
                    <img class="talk4-img" src="../assets/talk4.svg" width="">
                    <img class="talk1-img-reg" src="../assets/talk1.svg" width="">
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
export default {
  name: "RegisterPage",
  data(){
    return {
      userRegister: {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      },
      error: false,
      messages: []
    }
  },
  methods: {
    register() {
      axios({
        url: "http://localhost:3000/register",
        method: "POST",
        withCredentials: true,
        data: this.userRegister
      })
      .then(({data}) => {
          this.changePage("login-page");
          Swal.fire (
              "Registerd",
              "Please log in!",
              "success"
          );
      })
      .catch((err) => {
          console.log(err.response.data.messages);
          this.messages = err.response.data.messages;
          this.error = true;
          this.$nextTick(()=> {
            console.log(this.$refs.error)
             this.$refs.error[0].$el.scrollIntoView();
          });
      })
      .finally(() => {
          this.userRegister.first_name = "";
          this.userRegister.last_name = "";
          this.userRegister.email = "";
          this.userRegister.password = "";
      });
    },
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