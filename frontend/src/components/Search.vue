<template>
     <div class="search">
        <input type="text" placeholder="Type to filter the table" id="search"
               @keyup="search" v-model="keyword">
        <label for="search">
            <i class="material-icons">search</i>
        </label>
    </div>
</template>

<script>
export default {
    data(){
        return{
            keyword:"",
        }
    },
    methods:{
        search(){   
            this.$store
                .commit('setSearchKeyword' , this.keyword)            
        }
    }
}
</script>

<style lang="scss" scoped>
    .search{
        display: flex;
        align-items: center;
        border-bottom: 2px solid #707070;
        height: fit-content;
        input {
            &::placeholder {
                font-style: italic;
            }
            border-bottom: unset;
            &:focus { 
                border-bottom: unset !important;
                box-shadow: unset !important;
            }
        }
    }

</style>