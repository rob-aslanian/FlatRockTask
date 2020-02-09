<template>
  <div class="users wrapper">
     <div class="users__content">
         <ul class="users__content-head">
            <li v-for="field of fields"  :key="field"
               @click="sortByType(field)">
                {{ field }}
                <img src="../assets/img/arrow.svg" alt="arrow"
                     :class="{'arrow-up': sortableFields[field] === 'dec'}">
            </li>
            <li>Actions</li>
         </ul>
         
          <!-- Loader --> 
          <loader v-if="isLoading"></loader>
          <!-- Loader --> 
        
          <!-- Content -->
          <template v-else-if="users.length > 0">
              <user v-for="user of users" :key="user['id']" :user="user" ></user>
              <pagination @recordChange="recordChange" @pageChanged="pageChanged"></pagination>
          </template>
          <!-- Content -->

          <div v-else>
              <h1 class="center-align">No data</h1>
          </div>
         
     </div>
  </div>
</template>

<script>
import User from './User';
import Pagination from './Pagination';
import { getUsers } from '../service/service';
import constats from '../constats';

export default {
    components:{
        User,
        Pagination
    },
    data(){
        return{
            isLoading:true,
            users:this.$store.getters.getUsers,
            fields:constats['fields'],
            sortableFields:{
                user:'asc',
                role:'asc',
                status:'asc',
            }
        }
    },
    computed:{
        keyword(){
            return this.$store.getters.getSearchKeyword
        }
    },
    watch:{
        // Search //
        keyword(oldValue , newValue){
            if (oldValue !== "") {
                this.users = this.$store.getters.getUsers.filter(user => {
                    const firstname = user.firstname.trim().toLowerCase(),
                          lastname  = user.lastname.trim().toLowerCase(),
                          email     = user.email.trim().toLowerCase();

                    let value = newValue.toLowerCase();
                    
                    return firstname.includes(value) ||
                           lastname.includes(value) ||
                           email.includes(value);
                    
                })
            } else {
                this.users = this.$store.getters.getUsers;
            }
            
        }
    },
    methods:{
        getUsers(first=5, after=0){
            getUsers(first , after).then(el => {
                const { users_amount , users } = el;

                this.$store
                    .commit('setUsersAmount' , users_amount);

                this.$store
                    .commit('setUsers' , users);

                this.users = this.$store.getters.getUsers;
                this.isLoading = false;

            })
            .catch(err => {
                this.isLoading = false;
                console.log(err);
            })
        },
        recordChange(record){
            this.getUsers(record);
        },

        pageChanged({first , after}){
            this.getUsers(first , after);
            
        },
        sortByType(field){     
            let sortBy  = this.sortableFields[field] === "dec" ?
                           this.sortableFields[field] =   "asc" :
                           this.sortableFields[field] =   "dec";
                    
                
            switch (field) {
                case "user":
                    this.users
                        .sort((a, b) => {
                            let first = a["firstname"].toLowerCase(),
                                last  = b["firstname"].toLowerCase();

                            if (sortBy === "asc") {
                                return first > last ? 1 : -1
                            }
                            return last > first ? 1 : -1
                        })
                    break;
                 case "role":
                    this.users
                        .sort((a, b) => {
                            if (sortBy === "asc") {
                                return a["role"] > b['role'] ? 1 : -1
                            }
                            return b["role"] > a['role'] ? 1 : -1
                        })
                    break;
                case "status":
                    this.users
                        .sort((a, b) => {
                           return (a['is_active'] === b['is_active']) ? 0 : a ? -1 : 1;
                        })
                    break;
                default:
                    break;
            }
        }
    },
    mounted() { 
        this.getUsers();
    },
};
</script>

<style lang="scss">
    .users {
        background: #f3f3f3;
        padding-top: 50px;
        min-height: 72vh;

        .arrow-up{
            transform: rotate(180deg);
        }
        
        &__content{
            margin-left: 8%;
            &-head{
                display: flex;
                justify-content: space-between;
                border-bottom: 2px solid #D8D8D8;
                padding: 0 15px 30px;

                li {
                  font-weight: bold;
                  text-transform: uppercase;
                  opacity: .35;

                  &:not(:last-child) {
                    transition: .3s opacity;
                    cursor: pointer;
                    &:hover{  opacity: 1; }
                  }
                }
            }
        }
    }
</style>