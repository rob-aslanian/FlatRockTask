<template>
  <div id="app">
    <main-header></main-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'app',
  components:{
    'main-header':Header,
  },
  data () {
    return {
      msg: process.env
    }
  }
}
</script>

<style lang="scss">
h1 {
  font-size: 36px;
}

h1, h2 {
  font-weight: normal;
  margin: 0;
}

ul {
  list-style-type: none;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #000000;
  font-weight: lighter;
}
select{
      border: unset;
      border-bottom: 1px solid #9e9e9e;

}

button { 
  cursor: pointer; 
  &:focus{ background-color: inherit; }
}

.wrapper{
   padding-left: 10%;
   padding-right: 5%;
}
.sm-avatar{
  height: 45px;
  width: 45px;
  border-radius: 50%;
  object-fit: cover;
}

.disabled{
  opacity: .35;
  pointer-events: none;
}

.role-admin{
  background: #7E7EF1;
  padding:3px 10px;
  border-radius: 30px;
  position: absolute;
  img { vertical-align: bottom; }
  &.deactive {
    background: unset !important;
    img{
      filter: brightness(0.5) grayscale(1) opacity(0.5);
    }
  }
}

.success { color: #44D36A !important; }
.error { color: #F44336 !important; }

.switch label input[type=checkbox]+.lever {
  background-color: rgba(#FF0000 , .5);
}
.switch label input[type=checkbox]+.lever:after {
  background-color:#FF0000;
}

.switch label input[type=checkbox]:checked+.lever {
  background-color: rgba(#44A0D3 , .5);
}
.switch label input[type=checkbox]:checked+.lever:after {
  background-color:#44A0D3;
}

// Buttons /// 
.btn-blue { background: #305ECA; }

.btn-grey{
  background: #C6C6C6;
  color: #979797;
  transition: .3s all;
  

  &:hover{
    color: #C6C6C6;
    background: #979797;
  }
}
.btn-light-blue , .btn-grey ,
.btn-red , .btn-dark-blue {
  border:unset;
  border-radius: 30px;
}

.btn-red{
  color: #fff;
  background: #F79696;
  transition: .3s all;

  &:hover{
    background: #fff;
    color: #F79696;
  }
}

.btn-light-grey {
  background: #C6C6C6;
}

.btn-dark-blue {
  background: #7E7EF1;
}

.btn-light-blue{
  color: #fff;
  background: #33A3DC;
}
</style>
