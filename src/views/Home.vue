<template>
  <div>
    <UserList></UserList>
    <Navigation></Navigation>
    <section>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <li class="list-group-item">Name : {{ user.name }}</li>
              <li class="list-group-item">Email : {{ user.email }}</li>
              <li class="list-group-item" :key="componentKey">Rank : {{ user.rank }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import Navigation from '../components/auth/navbar.vue'
import UserList from '../components/auth/userslist.vue'
export default {
  data() {
    return {
      user: {},
      componentKey: 0
    };
  },
  components: {
    'Navigation': Navigation,
    'UserList' : UserList
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
  created() {
    this.getUserDetails();
  },
  destroyed() {
    console.log('Component has been destroyed!');
  },
  forceRerender() {
    this.componentKey += 1;
  }
};
</script>
<style scoped></style>