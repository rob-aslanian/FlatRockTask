import Vue from "vue";
import Router from "vue-router";
import Main from './views/MainContet.vue' 
import UserSettings from './views/UserSettings.vue';

Vue.use(Router);

export default new Router({
  // mode:"history",
  routes: [
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
      path: "/settings/:id",
      name: "settings",
      component: UserSettings
    },
  ]
});