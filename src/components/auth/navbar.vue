<template>
  <div id="app">
    <div>
  <b-navbar toggleable="lg" type="dark" class="navbar-dark bg-dark" variant="info">
    <b-navbar-brand href="#">SCSO Admin panel</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/bans">bans</b-nav-item>
        <b-nav-item href="/addban">Create Ban</b-nav-item>
        <!--<b-nav-item href="#" disabled>Disabled</b-nav-item>-->
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            User management
          </template>
          <b-dropdown-item href="/home">Rank users</b-dropdown-item>
          <b-dropdown-item href="/">View users</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      
      <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        <!--<b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>-->

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            Settings
          </template>
          <b-dropdown-item href="/home">Profile</b-dropdown-item>
          <b-dropdown-item href="/" @click="logUserOut">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </div>
    <!--<nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/home" class="navbar-brand">SCSO Admin Panel</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/bans" class="nav-link">Bans</a>
        </li>
        <li class="nav-item">
          <a href="/addban" class="nav-link">Add a ban</a>
        </li>

        <li class="nav-item active" style="float:right;">
          <a class="nav-link" style="float:right;" href="/login" @click="logUserOut"> Logout</a>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>-->
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: 'app',
  data() {
    return {
      user: {},
      componentKey: 0
    };
  },
  methods: {
    async getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      let response = await this.$http.post("/update", decoded);
      let urank = response.data.rank;
      this.user = decoded;
      this.user.rank = urank;
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    }
  },
}
</script>