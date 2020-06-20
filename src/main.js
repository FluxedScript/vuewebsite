import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import SocketIO from "socket.io-client"
import  VueSocketio from 'vue-socket.io';
import VueJwtDecode from "vue-jwt-decode";
router.beforeEach( async (to, from, next) => {
  try{
    if (to.name !== "login" && to.name !== "register" && to.name != "Error 404"){
      var token = window.localStorage.getItem('jwt');
      var decoded = VueJwtDecode.decode(token);
      const SocketInstance = SocketIO.connect('http://localhost:4000', {
        query: {
            name: decoded.name,
            id: decoded._id,
            rank: decoded.rank
        }
        
      });
      Vue.use(new VueSocketio({
        debug: false,
        connection: SocketInstance
      }));
    }
    next()
  } catch{
    next()
  }
})
// import SocketIO from "socket.io-client"



const base = axios.create({
  baseURL: "http://localhost:4000"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;
Vue.config.silent = true
Vue.config.devserver = {host: "0.0.0.0"}
Vue.config.devtools = false
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");