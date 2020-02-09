<template>
    <div class="pagination">
        <div class="pagination__left">
            <span>Records on page</span>    
            <select class="browser-default" @change="$emit('recordChange' , records)"  v-model="records">
                <option :value="amount" v-for="amount of records_amount" 
                        :key="amount">
                    {{ amount }}
                </option>
            </select>        
        </div>

        <div class="pagination__right" v-if="pagesAmount > 1">
            <button class="pagination__right-text"  v-show="current_page > 1"
                    @click="changePage('dic')">
                <span>Previous</span>
            </button>

            <button class="pagination__right-number" v-for="index in pagesAmount"
                    :key="index" :class="{'active': index == current_page }" 
                    @click="changePage(index)">
                {{ index }}
            </button>

            <button class="pagination__right-text" :disabled="current_page == pagesAmount"
                    @click="changePage('inc')">
                <span>Next</span>
            </button>
        </div>
    </div>
</template>

<script>
import Consts from '../constats';

export default {
    data(){
        return{
            records:5,
            records_amount:Consts['records_amount'],
            users_amount: this.$store.getters.getUsersAmount,
            current_page:1,
        }
    },
    computed:{
        pagesAmount() {
            return Math.ceil(this.users_amount / this.records)
        }
    },
    methods:{
        changePage(page){

            if (page != this.current_page) {
                switch (page) {
                    case "dic":
                        this.current_page--;
                        break;
                    case "inc":
                        this.current_page++;
                        break;
                    default: 
                        this.current_page = page;
                        break;
                }

                let after = 0;

                if (this.current_page == 1) {
                    after = 0;
                } else if (this.users_amount < (this.records * this.records)) {
                    after = this.users_amount - (this.users_amount - this.records);
                } else {
                    after = this.records * this.current_page - 1;
                }

                this.$emit('pageChanged' , {
                   first:this.records,
                   after,
                })
            }
            
        }
    }
}
</script>

<style lang="scss">
    .pagination {
        display: flex;
        justify-content: space-between;
        padding: 3rem 0 8rem;
        span { font-weight: lighter; }

        // Left side //
        &__left{
            display: flex;
            align-items: center;
            flex-basis: 50%;
            select{
                cursor: pointer;
                background-color: unset;
                outline: unset;
                font-weight: bold;
                width: 55px;
                margin-left: 0.5rem;
            }
        }

        // Right side //
        &__right{
            &-text , &-number{
                background: unset;
                border: unset;
            }
            &-number{
                font-weight: bold;
                padding: 5px 10px;
                margin-right: 0.5rem;
                transition: .2s all;
            }
            .active , &-number:hover{
                background-color: #c6c6c6;
                box-shadow: 0px 0px 6px 3px #00000029;
                border-radius: 3px;
                border:unset;
            }
        }
    }
</style>