<template>
   <div class="delete">
    <h4>Delete User</h4>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">face</i>
            <input disabled id="email" type="text" :value="fullName" >

            <span class="light-blue-text darken-3" v-if="user.is_active">Active User</span>
            <span class="red-text  darken-3" v-else>Inactive User</span>

          </div>
        </div>

        <button type="submit" class="btn btn-red" @click="deleteUser">
            Delete user
        </button>
  </div>
</template>

<script>
import { deleteUser } from '../service/service';
export default {
  props:{
    user:{ type:Object }
  },
  computed:{
    fullName(){
      if (this.user) {
        return `${this.user.firstname} ${this.user.lastname}`
      }
      return "";
    }
  },
  methods:{
    deleteUser() {
       deleteUser(this.user._id)
                 .then(_ => {
                    this.$store
                        .commit('removeUser' , this.user)

                    this.$emit('close');
                 })
                 .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
    .delete{
        padding: 1rem 2rem;

        button { margin-left: 3rem; }
        h4 { margin-left: 3.25rem; }

        span { 
          position: absolute;
          right: 0;
        }
    }
</style>