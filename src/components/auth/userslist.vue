<template>
  <div id="app">
    <div>
    <div style="float:right;width:30%;border-left:1px solid black;padding:1%;">
      <b>Users</b>
      <b-list-group style="max-width: 300px;" v-if="renderComponent">
        <b-list-group-item class="align-items-center" v-for="value in usersList" v-bind:key="value.name" @updateListEv="updateList" >
          <b-avatar class="mr-3"></b-avatar>
          <span class="mr-auto">{{ value.name }}</span>
          <b-badge>{{ value.rank }}</b-badge>
        </b-list-group-item>
      </b-list-group>
      <ul class="list-group">
      </ul>
    </div>
  </div>
  </div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script>
import io from 'socket.io-client';
import $ from 'jquery'
var socket = io('http://localhost:4000');
socket.on('update', function (users){
      this.userList = users;
      console.log(this.userList)
}) 
import VueJwtDecode from "vue-jwt-decode";
export default {
  
  name: 'app',
  props: {
    userList2: {
      type: Array,
      default: () => []
    }
  },
  data() {
    
    return {
      user: {},
      componentKey: 0,
      userList: this.userList2,
      renderComponent: true,
      socket: io('http://localhost:4000')
      
    };
  },
  
  created () {
    // get socket somehow
    this.socket.on('update', function (users){
      //console.log(this.userList)
      this.userList = users;
    })
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
    },
    updateList(updatedList) {
      this.userList2 = updatedList
    }
  },
}
</script>