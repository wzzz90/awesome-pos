<template>
  <div class="left-nav">
  	<ul>
  		<li>
  		  <i class="icon iconfont icon-wodezichan"></i>
  		  <p>收银</p>
  		</li>
  		<li>
  		  <i class="icon iconfont icon-jinrudianpu"></i>
        <p>店铺</p>
  		</li>
  		<li>
  		  <i class="icon iconfont icon-liebiao1"></i>
        <p>商品</p>
  		</li>
  		<li>
  		  <i class="icon iconfont icon-31huiyuan"></i>
        <p>会员</p>
  		</li>
  		<li>
  		  <i class="icon iconfont icon-bangzhuzhongxin"></i>
        <p>统计</p>
  		</li>
  	</ul>
  </div>
</template>

<script>
  export default {
    NAME: 'LeftNav'
  }
</script>

<style lang="less" scoped="scoped">
  .left-nav{
     color:#fff;
     font-size:10px;
     height:100%;
     background-color: #1D8ce0;
     width:5%;
     ul {
      padding:0px;
      margin: 0px;
       li {
          list-style: none;
          text-align: center;
          border-bottom:1px solid #20a0ff;
          padding:10px;         
       }
     }
  }
  .iconfont{
     font-size:24px;
  }
</style>