<template>
  <div class="invite">
    <h4>Invite New User</h4>
    <!-- Error message --> 
    <span class="helper-text error" v-if="errors['server']">
        {{ errors['server'] }}
    </span>
    <!-- Error message  -->
      <form @submit.prevent="submitForm"  novalidate="true">
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">face</i>
            <input id="first_name" type="text" class="validate" v-model="firstname"/>
            <label for="first_name">*First Name</label>
            <!-- Error message --> 
            <span class="helper-text error" v-if="!firstname">
                {{ errors['firstname'] }}
            </span>
            <!-- Error message  -->
          </div>
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate" v-model="lastname"/>
            <label for="last_name">*Last Name</label>
            <!-- Error message --> 
            <span class="helper-text error" v-if="!lastname">
                {{ errors['lastname'] }}
            </span>
            <!-- Error message  -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">
                <img src="../assets/img/email.svg" alt="email">
            </i>
            <input id="email" type="email" class="validate"  v-model="email"/>
            <label for="email">*Email</label>
            <!-- Error message --> 
            <span class="helper-text error" v-if="!isEmailValid">
                {{ errors['email'] }}
            </span>
            <!-- Error message  -->
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">
                <img src="../assets/img/vpn_key.svg" alt="email"
                     style="filter: brightness(0);">
            </i>
            <select class="browser-default" v-model="role">
                <option value="null" disabled selected>*Role</option>
                <option :value="role" v-for="role in roles" :key="role">
                    {{ role }}
                </option>
            </select>
            <!-- Error message --> 
            <span class="helper-text error" v-if="!role">
                {{ errors['role'] }}
            </span>
            <!-- Error message  -->
          </div>
          
        </div>

        <div class="invite__bottom">
            <button type="submit" class="btn"
                    :class="{'btn-grey': !isFormValid ,
                             'btn-light-blue': isFormValid}">
                Send Invitation
            </button>
            <div class="right-align">
                <i class="error" v-if="!isFormValid">Fill in all the fields</i>
                <i class="success" v-else>Good to go</i>
            </div>
        </div>

      </form>
  </div>
</template>

<script>
import constats from '../constats.js';
import { addUser } from '../service/service';

export default {
    data(){
        return{
            firstname:null,
            lastname:null,
            email:null,
            role:null,
            roles:constats['roles'],
            errors:{
                firstname:null,
                lastname:null,
                email:null,
                role:null,
                server:null,
            },
        }
    },
    computed:{
        isFormValid(){         
            if(this.firstname && this.lastname &&
               this.isEmailValid && this.role) {
                 if(this.firstname.trim() !== "" &&
                    this.lastname.trim() !== ""){
                   return true;
                }
                return false;
            }
            return false;
        },
        isEmailValid() {
           return /(https?:)?(\/\/)?(w{3}\.)?(\w{2,19}\.)(\w{1,12}(\.\w+)?)\/*\S+/.test(this.email)
        }
    },
    methods:{
        submitForm(){
            if(!this.isFormValid) {
                this.setErrors();
            } else {
                addUser({
                    firstname:this.firstname,
                    lastname:this.lastname,
                    email:this.email,
                    role:this.role
                })
                .then(({data}) => {
                    this.$store
                        .commit('addUser' , data)

                    this.$emit("close");
                })
                .catch(err => {
                    this.errors['server'] = err;
                })
            }
        },
        setErrors(){
            Object.keys(this.errors)
                  .map(key => {
                       //  Set Error message //
                       if (!this[key]) {
                           this.errors[key] = `${key} field is required`
                       } 
                       else {
                           if (key === "email" && 
                               !this.isEmailValid) {
                               this.errors['email'] = "Email format is`t correct`";
                           }
                       }
                  })   
        }
        
    }
};
</script>

<style lang="scss">
 .invite{
     padding: 1rem 3rem;

     h4{ margin-left: 3.25rem; }

     select{
         margin-left: 3rem;
     }

     .invite__bottom{
         margin-left: 3rem;
         display: flex;
         justify-content: space-between;
         align-items: center;
     }
 }
</style>