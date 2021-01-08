<template>
  <div id="app">
   <router-view v-if="isRouterAlive"></router-view> 
  </div>
</template>
 
<script>
  export default {
    provide(){
      return{
        reload:this.reload
      }
    },
    data(){
     return{
      isRouterAlive: true
    }
    },
    methods:{
    reload () {
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
   }   
    },
    name: 'App'
  }
</script>

<style scope>
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* background-color: #F6F8F9; */
  /* margin-top: 60px; */
}
.el-dialog{
  width: 25%;
}
</style>
