<template>
    <div class="permission" v-if="user">
        <div class="permission__top">
            <h1>Permissions</h1>
            <span :class="{'disabled':!user.is_active}">{{ user.role  }}</span>
        </div>
        <div class="permission__main" :class="{'disabled':!user.is_active}" >
            <div class="permission__main__target">
                <strong>Super {{ user.role }}</strong>
                <div class="switch">
                    <label>
                        <input type="checkbox" :checked="checkedAll">
                        <span class="lever"></span>
                    </label>
                </div>
            </div>

            <div class="permission__main__group" v-for="data of permissions_data" 
                 :key="data['name']" @click="toggleBox(data['name'])">
                <i class="material-icons">keyboard_arrow_down</i>
                <div class="permission__main__target">
                    <strong>Permission {{ data['name'] }}</strong>
                    <div class="switch">
                        <label>
                            <input type="checkbox" :checked="checkedAll">
                            <span class="lever"></span>
                        </label>
                    </div>
                </div>
                <div class="permission__main__group__detail" v-if="groups[data['name']]">
                    <div class="permission__main__target" :class="{
                            'active':userPermission[permission['key']],
                            'inactive':!userPermission[permission['key']],
                        }"
                         v-for="permission of data['permissions']" :key="permission['key']">
                        <strong>{{ permission['name'] }}</strong>
                        <div class="switch">
                            <label>
                                <input type="checkbox" v-model="userPermission[permission['key']]">
                                <span class="lever"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import constats from '../../constats.js';

export default {
    data(){
        return {
            user:this.$store.getters.getCurrentUser,
            permissions_data:constats['permissions_list'],
            permissions:constats['permissions'],
            groups:{
                Update:false,
                Other:false,
            },
        }
    },
    computed:{
        userPermission() {
            return this.user.permissions;
        },
        checkedAll() {
            return this.permissions
                       .every(el => this.userPermission[el])
        }
    },
    methods:{
        toggleBox(type){      
            console.log(this.user);
            
            Object.keys(this.groups)
                  .map( el => el === type ? 
                        this.groups[type] = !this.groups[type] :
                        this.groups[el] = false ) 
        }
    },

}
</script>

<style lang="scss" scoped>
    .permission{
        padding: 0 2rem;
        &__top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 50px;
            span { text-transform: capitalize; }
        }

        &__main{

            &__target , &__group {
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #D8D8D8;
            }

            &__target{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }

            &__group{
                position: relative;
                cursor: pointer;
                i{ 
                    position: absolute;
                    left: -35px;
                }
                .permission__main__target{
                    border-bottom: unset;
                    padding: unset;
                    margin: unset;
                }

                &__detail{
                    margin-left: 1.5rem;
                    margin-top: 2rem;
                    .permission__main__target{
                        margin-bottom: unset;
                        padding: 0.5rem 0;
                        position: relative;

                        &.active::before , &.inactive::before{
                            content: "";
                            position: absolute;
                            height: 7px;
                            width: 7px;
                            border-radius: 50%;
                            left:-15px;
                        }
                        &.active::before { background: #44A0D3; }
                        &.inactive::before { background: #FF0000; }
                    }
                }
            }
        }
    }
</style>