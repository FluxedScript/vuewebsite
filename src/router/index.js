import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VueJwtDecode from "vue-jwt-decode";
import http from "../http-common";
Vue.use(VueRouter);
const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
        guest: true
    }
  },
  {
    path: "/bans",
    name: "bans",
    component: () => import("../views/bans.vue"),
    meta: {
        requiresAuth: true,
        is_admin : true
    }
  },
  {
    path: "/addban",
    name: "addban",
    component: () => import("../views/addban.vue"),
    meta: {
        requiresAuth: true,
        is_admin : true
    }
    
  },
  {
    path: "/ban/:id",
    name: "ban info",
    component: () => import("../views/bandetail.vue"),
    meta: {
        requiresAuth: true,
        is_admin : true
    }
  },
  {
    path: "/",
    name: "login",
    component: () => import("../views/login.vue"),
    meta: {
        guest: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue"),
    meta: {
        guest: true
    }
  },
  {
    path: "*",
    name: "Error 404",
    component: () => import("../views/error404page.vue"),
    meta: {
        guest: true
    }
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach( async (to, from, next) => {
  try{
    if (to.name !== "login" && to.name !== "register" && to.name != "Error 404"){
      let info = localStorage.getItem('jwt');
      let user = VueJwtDecode.decode(info);
      let response = await http.post("/update", user);
      let rank = response.data.rank;
      if (to.name !== 'login' && to.name !== "register" && to.name != "Error 404" && user == null){ //If user not logged in
        next({ name: 'login' })
      }else { //if user is logged in
        if (to.name == "addban" && ['Owner','Creator','Mod', 'Developer', 'Admin'].indexOf(rank) == -1){//if user is allowed
          next({name: "home"})
        }else{ //User is of rank
          next()
        }
      }
    } else{ //If going to login,register or error 404 page
      let info = localStorage.getItem('jwt');
      let user = VueJwtDecode.decode(info);
      if(user != null && to.name == "login"  || to.name == "register"){
        console.log("Redirect")
        next({name: "home"})
      }else{
        next()
      }
    }
    
  } catch{
      if (to.name !== "login"&& to.name !== "register" && to.name != "Error 404"){
        next({name: "login"})
      } else{
        next()
      }
  }
  
  
})
export default router;