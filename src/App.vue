<template>
  <div id="app">
    <!--左侧导航-->
    
      <leftNav></leftNav>
    
    <!--操作区域-->
    <div class="main">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import leftNav from '@/components/common/leftNav'
export default {
  data() {
    return {
      
    }
  },
  components:{
    leftNav
  }
}
</script>

<style lang="less" scoped="scoped">
#app {
  font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
   height:100%;
  .main{
    flex: 1;
    background-color: #EFF2F7;
    height:100%;
    overflow: auto;
    padding-left: 15px;
  }
}


</style>
