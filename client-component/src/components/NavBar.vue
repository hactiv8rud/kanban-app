<template>
  <div>
    <nav class="navbar navbar-light bg-light fixed-top row">
        <div class="navbar-left col-12 col-md-3 col-lg-3">
        <button type="button" @click="changePage('main-page')" class="navbar-brand rounded">
            <img src="../assets/kanban-logo.svg" width="30" height="30" class="d-inline-block align-top" alt=""
                loading="lazy">
            Kanban
        </button>
        <!-- <button @click="changePage('main-page')" type="button" class="btn btn-light home-btn">Home</button> -->
        <button @click="$emit('show-info')"type="button" id="btn-info" class="navbar-brand rounded navbar-btn">
            <img src="../assets/info.svg" width="30" height="30" class="d-inline-block align-top" alt=""
                loading="lazy">
            <p class="navbar-btn-info">Info</p>
        </button>
        <button @click="$emit('show-add-category-form')" type="button" id="btn-add-category" class="navbar-brand rounded navbar-btn">
            <img src="../assets/add-category.svg" width="30" height="30" class="d-inline-block align-top" alt=""
                loading="lazy">
            <p class="navbar-btn-add-category">Add Category</p>
        </button>
        <button @click="logout" type="button" id="btn-logout" class="navbar-brand rounded navbar-btn">
            <img src="../assets/logout.svg" width="30" height="30" class="d-inline-block align-top" alt=""
                loading="lazy">
            <p class="navbar-btn-logout">Sign out</p>
        </button>
      </div>
      <div class="form-group search-container col-12 col-sm-12 col-md-7 col-lg-5">
        <select v-model="searchKey.by" class="form-control search-by" name="search-by">
          <option value="name" selected>Name</option>
          <option value="title">Title</option>
          <option value="due">Due</option>
        </select>
        <input v-model="searchKey.words" @keyup="filterSearch" class="form-control search border-light" type="text" placeholder="search ...">
      </div>
      <div id="right-btn-container">
        <button @click="$emit('show-add-category-form')" type="button" id="btn-add-category-right" class="navbar-brand rounded navbar-btn">
            <img src="../assets/add-category.svg" width="30" height="30" class="d-inline-block align-top" alt=""
                loading="lazy">
            <p class="navbar-btn-add-category-right">Add Category</p>
        </button>
        <button @click="logout" type="button" id="btn-logout-right" class="navbar-brand rounded navbar-btn">
            <img src="../assets/logout.svg" width="30" height="30" class="d-inline-block align-top" alt=""
                loading="lazy">
            <p class="navbar-btn-logout-right">Sign out</p>
        </button>
        <!-- <button @click="$emit('show-add-category-form')" type="button" class="btn btn-light ml-auto btn-add-category">Add Category</button>
        <button @click="logout" type="button" class="btn btn-light" id="btn-logout">Log out</button> -->
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      searchKey: {
        by: "name",
        words: ""
      }
    }
  },
  methods: {
    changePage(pageName) {
      this.$emit("changePage", pageName);
    },
    logout() {
      this.changePage("login-page");
      localStorage.clear();

      // Vue.GoogleAuth.then(auth2 => {
      //   auth2.signOut().then(function() {
      //     console.log('User signed out.');
      //   });
      // });
    },
    filterSearch() {
      if (this.searchKey.words !== "") {
         this.$emit("setSearchKey", this.searchKey);
      }
    }
  }
}
</script>
<style>
  
</style>