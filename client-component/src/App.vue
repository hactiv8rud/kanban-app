<template>
  <div>
    <Info @closeShowInfo="info=false"></Info>
    <LoginPage v-if="pageName === 'login-page'" @changePage="changePage"></LoginPage>
    <RegisterPage v-else-if="pageName === 'register-page'" @changePage="changePage"></RegisterPage>
    <!-- <MainPage v-else-if="pageName === 'main-page'" @changePage="changePage" @setTaskId="setTaskId" @setTaskEditData="setTaskEditData"></MainPage> -->
    <MainPage v-else-if="pageName === 'main-page'" @changePage="changePage"></MainPage>
  </div>
</template>

<script>
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import MainPage from "./components/MainPage";
import Info from "./components/Info.vue";

export default {
  name: "App",
  data() {
    return {
      pageName: 'login-page',
      info:true,
      // TaskId: 0,
      // taskEditData: {
      //   title: "",
      //   description: "",
      //   due_date: "",
      // }
    };
  },
  methods: {
    changePage(pageName) {
      this.pageName = pageName;
    },
    // setTaskId(TaskId) {
    //   this.TaskId = TaskId
    // },
    // setTaskEditData(taskEditData) {
    //   this.taskEditData.title = taskEditData.title,
    //   this.taskEditData.description = taskEditData.description,
    //   this.taskEditData.due_date = taskEditData.due_date
    // }
  },
  watch: {
    info: function () {
      this.$nextTick()
      .then(() => {
        if (this.info) {
        $("#info-modal").modal("show");
        } else if(!this.info) {
          $("#info-modal").modal("hide");
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
        }
      })
    }
  },
  components: {
    LoginPage,
    RegisterPage,
    MainPage,
    Info
  },
  created() {
    if (localStorage.getItem("access_token")) {
        this.pageName = "main-page";
    } else {
        this.pageName = "login-page";
        $("#info-modal").modal("show");
    }
  },
  mounted() {
    if (!localStorage.getItem("access_token"))
      $("#info-modal").modal("show");
  }
};
</script>

<style>
</style>