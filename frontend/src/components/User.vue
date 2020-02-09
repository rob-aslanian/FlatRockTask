<template>
   <div>
        <div class="user" v-if="user" :class="{'disable':!user.is_active}">
            <img :src="user.avatar | avatar" alt="avatar" class="sm-avatar" >
            <div class="user__info">
                <strong>{{ user.firstname }}  {{ user.lastname }}</strong>
                <a :href="'mailto:' + user.email">
                    {{ user.email }}
                </a>
            </div>
            <div class="user__role">
                <div class="role-admin" v-if="user.role === 'admin'"
                    :class="{'deactive':!user.is_active}">
                    <img src="@img/vpn_key.svg" alt="key">
                </div>
                <strong>
                    {{ user.role }}
                </strong>
            </div>
            <div class="user__status">
                <div class="switch">
                    <label>
                        <input type="checkbox" :checked="user.is_active" 
                            @change="toggleStatus($event)">
                        <span class="lever"></span>
                    </label>
                </div>
            </div>

            <div class="user__action">
                <router-link :to="{ name: 'settings', params: { id: user._id }}"
                            v-show="user.is_active">
                    <button> 
                        <i class="material-icons">settings</i>
                    </button>
                </router-link>
                <button @click="showModal = true">
                    <i class="material-icons">delete</i>
                </button>
            </div>
        </div>
        <modal v-if="showModal"  @close="showModal = false">
            <delete-user :user="user" @close="showModal = false"></delete-user>
        </modal>
   </div>

</template>

<script>
import { updateUser } from '../service/service';
import DeleteUser from '../containers/DeleteUser';

export default {
    components:{
        DeleteUser,
    },
    props:{
        user:{ type:Object  },
    },
    data(){
        return{
            showModal:false,
        }
    },
    methods:{
        toggleStatus(e , id){
            let isChecked = e.target.checked;

            updateUser(this.user._id ,
                       {is_active:isChecked}) 
                      .then(_ => this.user.is_active = isChecked)

        }
    }

}
</script>

<style lang="scss">

    .disable{  opacity: .5;  }
    .role-admin {
        left: calc(-34px - 22px);
        bottom: -5px;
    }
    .user{
        display: flex;
        align-items: center;
        position: relative;
        border-bottom: 1px solid #D8D8D8;
        padding-bottom: 20px;
        margin-top: 25px;
        .sm-avatar{
            position: absolute;
            left: -8.5%;
        }

        // Info //
        &__info{
            display: flex;
            flex-direction: column;
            flex-basis: 31%;
        }
        &__role { 
            flex-basis: 29%;
            text-transform: capitalize; 
            position: relative;
        }
        &__status { flex-basis: 33%; }

        &__action{
            display: flex;
            justify-content: flex-end;
            flex-basis: 6%;
            button:first-child{ margin-right: 10px; }
            button {
                background: unset;
                border: unset;
                padding: unset;
                cursor: pointer;
                i { 
                    color: #C6C6C6;
                    font-size: 20px;
                     transition: .3s color;
                }

                &:hover{
                    transform: scale(1.2);
                    i { color: #000; }
                }
             }
        }
    }
</style>