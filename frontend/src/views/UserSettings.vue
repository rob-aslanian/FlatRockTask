<template>
     <div class="row wrapper">
          <loader v-if="isLoaded"></loader>
          <template v-else>
            <div class="col l3 m12 s12">
                <user-info></user-info>
            </div>
            <div class="col l4 m12 s12">
                <user-detail></user-detail>
            </div>
            <div class="col l5 m12 s12">
                <user-permission></user-permission>
            </div>
          </template>
     </div>
</template>

<script>
import UserInfo from '../components/user-settings/UserInfo';
import UserDetail from '../components/user-settings/UserDetail';
import UserPermission from '../components/user-settings/UserPermission';

import { getUsersByID } from '../service/service';

export default {
    components:{
        UserInfo,
        UserDetail,
        UserPermission
    },
    data(){
        return{
            isLoaded:true,
        }
    },
    mounted(){
        let id = this.$route.params['id'];

        getUsersByID(id)
                    .then(user => {
                        this.$store
                            .commit('setCurrentUser' , user);
                            
                        this.isLoaded = false;         
                    })
                    .catch(err => {
                        console.log(err);
                        this.isLoaded = false;
                    })       
    }
}
</script>

<style scoped>
    .row { 
        margin-bottom: unset;
        padding-top:40px;
        padding-bottom: 40px;
        background: #F3F3F3;
    }
</style>