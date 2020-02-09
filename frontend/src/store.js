import Vuex from 'vuex';
import Vue from "vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    users_amount:0,
    users:[],
    current_user:{},
    search:"",
  },

  mutations:{
    setUsersAmount(state ,payload) {
      state.users_amount = payload;
    },
    setUsers(state , payload) {
       if (Array.isArray(payload)) {
          state.users = payload;
       }
    },
    setCurrentUser(state , payload){
        if(!payload) return;
        
        state.current_user = payload;
    },
    setSearchKeyword(state , paylod) {
        state.search = paylod; 
    },
    addUser(state , payload) {
      if (!payload) return;
      state.users.unshift(payload);
    },
    removeUser(state , payload) {
      if (!payload) return;
      
      let indexOf = state.users
                         .indexOf(payload);
                        
      if (indexOf > -1) {
         state.users.splice(indexOf , 1);
      } 
    }
  },

  actions:{
    setUsersAmount(context){
      context.commit('setUsersAmount');
    },
    setUsers(context){
      context.commit('setUsers');
    },
    setCurrentUser(context){
      context.commit('setCurrentUser');
    },
    setSearchKeyword(context){
      context.commit('setSearchKeyword');
    },
    addUser(context){
      context.commit('addUser');
    },
    removeUser(context){
      context.commit('removeUser');
    }
  },

  getters:{
     getUsersAmount: state => state.users_amount,
     getUsers: state => state.users,
     getCurrentUser: state => state.current_user,
     getSearchKeyword: state => state.search,
  }

});
  
  export default store;