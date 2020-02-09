<template>
    <div class="info" v-if="user">
        <div class="info__avatar">
            <img v-if="imageSrc" :src="imageSrc" class="avatar">
            <img v-else :src="user.avatar | avatar" class="avatar">

            <input type="file"  id="avatar" style="display:none" accept="image/*"
                   @change="uploadImage">
            <label for="avatar" v-if="!imageSrc && user.is_active">
                upload a photo
            </label>

            <div class="row" v-else-if="user.is_active">
                <div class="col s6">
                    <button class="btn save-btn" @click="saveImage">
                        Save
                    </button>
                </div>
                <div class="col s6">
                    <button class="btn btn-red" @click="imageSrc = null">
                        Delete
                    </button>
                </div>
                
            </div>
         
             <div class="role-admin" v-if="user.role === 'admin'">
                <img src="@img/vpn_key.svg" alt="key">
            </div>
        </div>
        <div class="info__detail" :class="{'disabled':!user.is_active}">
            <h4>{{ user.firstname }}</h4>
            <h4>{{ user.lastname  }}</h4>
            <a :href="'mailto:' + user.email">
                {{ user.email }}
            </a>
        </div>
        <button class="btn btn-dark-blue btn-large" v-if="user.is_active">
            Resend the invite
        </button>
    </div>
</template>

<script>
import { uploadAvatar } from '../../service/service';
export default {
    data(){
        return{
            user:this.$store.getters.getCurrentUser,
            imageSrc:null,
            imageBlob:null,
        }
    },
    methods:{
        uploadImage(e){
            let file = e.target.files[0];

            this.imageBlob = file;
            
            let reader = new FileReader()
            reader.onload = (e) => {
                this.imageSrc = e.target.result
            }
            reader.readAsDataURL(file);      
        },
        saveImage() {
            const formData = new FormData();
                  formData.append('avatar' , this.imageBlob),
                  formData.append('user_id' , this.user._id),
     

            uploadAvatar(formData).then(({data}) => {
                this.user.avatar = data['data'].name;
                this.imageSrc = null;
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .save-btn{
        border-radius: 30px;
        margin: 0 auto;
        display: block;
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // Avatar // 
        &__avatar{
            position: relative;
            text-align: center;
            .avatar { 
                height: 200px;
                width: 200px;
                border-radius: 50%;
                object-fit: cover;
            }
            label {
                display: block;
                text-align: center;
                font-weight: lighter;
                font-size: 14px;
                text-transform: uppercase;
                margin-top: 14px;
                cursor: pointer;
            }
            .role-admin {
                right: 0;
                left: unset;
                top: 130px;
                width: 70px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #707070;
            }
        }

        // Detail //
        &__detail {
            margin: 30px 0 60px;
            text-align: center;
            h4 {
                margin: 0;
                font-weight: 500;
            }
            a{
                font-weight: lighter;
                display: block;
                margin-top: 13px;
            }
        }
    }
</style>