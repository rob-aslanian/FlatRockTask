import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from "./router";
import store from './store';

import { Avatar } from './filters/index';

import Loader from './components/Loader.vue';
import Modal from './components/Modal.vue';

// __ COMPONENTS __ //
Vue.component('loader' , Loader);
Vue.component('modal' , Modal);

// __ FILTERS __ //
Vue.filter('avatar' , Avatar);

Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
