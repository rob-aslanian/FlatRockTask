<template>
    <div class="details" v-if="user">
        <h1>Details</h1>
        <div class="details__top">
            <div class="switch">
                <label>
                    <input type="checkbox" v-model="user.is_active" >
                    <span class="lever"></span>
                </label>
            </div>
            <span>The user is &nbsp;</span>
            <strong >
                {{ user.is_active ? 'Active' : 'Inactive' }}
            </strong>

        </div>
        <div class="details__form" :class="{'disabled':!user.is_active}">
            <form novalidate="true" @submit.prevent="submitForm">
                <div class="input-field">
                    <input id="first_name" type="text" class="validate" v-model="firstname"/>
                    <label for="first_name" v-if="!firstname">*First name</label>
                    <!-- Error message --> 
                    <span class="helper-text error" v-if="!firstname">
                        First name is required
                    </span>
                    <!-- Error message  -->
                </div>
                <div class="input-field">
                    <input id="last_name" type="text" class="validate" v-model="lastname"/>
                    <label for="last_name"  v-if="!lastname">*Last name</label>
                    <!-- Error message --> 
                    <span class="helper-text error" v-if="!lastname">
                        Last name is required
                    </span>
                    <!-- Error message  -->
                </div>

                <div class="input-field">
                    <select class="browser-default" v-model="role">
                        <option value="null" disabled selected>*Role</option>
                        <option  v-for="_role in roles" :key="_role" :value="role" 
                                :selected="_role == role">
                            {{ _role }}
                        </option>
                    </select>
                </div>

                <button class="btn btn-light-blue btn-large" 
                        type="submit" v-if="user.is_active">
                    Save Changes
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import constants from '../../constats';
import {  updateUser } from '../../service/service';

export default {
    data(){
        return {
            user:this.$store.getters.getCurrentUser,
            roles:constants['roles'],
            firstname:null,
            lastname:null,
            role:null,
        }
    },
    mounted(){
        // Patch data //
        const { firstname , lastname , 
                role , is_active } = this.user;

        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
    },
    methods:{
        submitForm() {
            if(this.firstname.trim() !== "" && 
               this.lastname.trim() !== "") {
      
                 updateUser(this.user._id , {
                     firstname:this.firstname,
                     lastname:this.lastname,
                     role:this.role,
                 })
                 .then(({data}) => {
                      this.$store
                          .commit('setCurrentUser' , data)

                      this.$router
                          .push({name:"main"})
         
                 })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
   .details {
        h1{ margin-left: 5rem; }
        &__top{ 
            display: flex;
            margin: 50px 0 45px;
        }
        &__form{
            margin-left: 4.5rem;
            button {
                margin-top: 85px;
            }
            select{ background: transparent; }
        }
   }
</style>