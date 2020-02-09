<template>
   <header class="header wrapper">
       <div class="header__content">
            <h1>{{ texts[currentRouteName] }}</h1>
            <search v-if="currentRouteName === 'main'"></search>
       </div>
        <template  v-if="currentRouteName === 'main'">
             <button class="btn-floating btn-large btn-blue" @click="isModalOpen = true">
                <i class="material-icons">add</i>
            </button>

            <modal v-if="isModalOpen" @close="isModalOpen = false">
                <invite-user @close="isModalOpen = false"> </invite-user>
            </modal>
        </template>
        <button v-else class="btn-floating btn-large btn-light-grey" >
            <i class="material-icons">settings</i>
        </button>
   </header>
</template>

<script>
import Search from './Search';
import InviteUser from '../containers/InviteUser';

export default {  
    components:{
        Search,
        InviteUser
    },
    data(){
        return {
            isModalOpen:false,
            texts:{
                main:"Project Access",
                settings:"User Setup"
            }
        }
    },
    computed:{
        currentRouteName(){
            return this.$route['name'];
        }
     }
}
</script>

<style lang="scss" scoped>
 .header{
     box-shadow: 0px 0px 6px 3px #00000029;
     position: relative;
     &__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 80px 0 40px 90px;
     }

     button {
         position: absolute;
         bottom: calc(28px - 56px);
     }
     
 }
</style>