<template>
  <div class="pos">
  	<div>
      <el-row>
        <el-col :span='7'>
          <el-tabs>
                <el-tab-pane label="点餐">
                 点餐   
                </el-tab-pane>
                <el-tab-pane label="挂单">
                挂单
                </el-tab-pane>
                <el-tab-pane label="外卖">
                外卖
               </el-tab-pane>
          </el-tabs>
          <div class="table-product">
            <el-table :data="tableData" border show-summary style="width: 100%" >
  
              <el-table-column prop="goodsName" label="商品"  ></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="money" label="金额" width="100"></el-table-column>
              <el-table-column  label="操作" width="100" fixed="right">
                  <template scope="scope">
                      <el-button type="text" @click="deleteProduct(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
                      <el-button type="text" @click="add(scope.$index, scope.row)" icon="el-icon-plus"></el-button>
                      <el-button type="text" @click="decrease(scope.$index, scope.row)" icon="el-icon-minus"></el-button>
                  </template>
              </el-table-column>
            </el-table>          	
          </div>
          <div class="btn-container">
          	<el-button type="warning" @click="pendingOrder">挂单</el-button>
            <el-button type="danger" @click="deleteAll">删除</el-button>
            <el-button type="success" @click="checkout">结账</el-button>
          </div>
          
        </el-col>
        <!--商品展示-->
        <el-col :span="17" class="product-list">
          <div class="often-goods">
              <div class="title">常用商品</div>
              <div class="often-goods-list">
          
                  <ul>
                      <li v-for="(goods, index) in oftenGoods" :key="index" @click="addOrderList(goods)">
                          <span>{{goods.goodsName}}</span>
                          <span class="o-price">{{goods.price | currency}}</span>
                      </li>
          
                  </ul>
              </div>
          </div>
          <div class="goods-type">
              <el-tabs v-model="activeName">
                  <el-tab-pane label="汉堡" name="0">
                      汉堡
                  </el-tab-pane>
                      <el-tab-pane label="小食" name="1">
                      小食
                  </el-tab-pane>
                  <el-tab-pane label="饮料" name="2">
                      饮料
                  </el-tab-pane>
                  <el-tab-pane label="套餐" name="3">
                      套餐
                  </el-tab-pane>
          
              </el-tabs>
              <ul class='cookList'>
                <li v-for="(goods, index) in typeGoods[activeName]" :key="index" @click="addOrderList(goods)">
                    <span class="foodImg">
                      <img :src="goods.goodsImg" width="100%">
                    </span>
                    <p class="foodName">{{goods.goodsName}}</p>
                    <p class="foodPrice">￥{{goods.price}}元</p>
                </li>
              </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    NAME: 'Pos',
    data() {
      return {
        tableData: JSON.parse(localStorage.getItem('tableData')) || [],
        oftenGoods:[],
        typeGoods:[],
        activeName: 0,
        totalCount: 0,
        totalMoney: 0
      }
    },
    filters: {
      currency(value) {
        return '￥' + value 
      }
    },
    mounted() {
      this.loadOfenGoods();
      this.loadClassGoods();
    },
    
    methods: {
      async loadOfenGoods() {
        let res;
        try{
          res = await this.$http.get('http://jspang.com/DemoApi/oftenGoods.php')
          this.oftenGoods = res.data
          console.log(res)
        }catch(e){
          console.log(e)
        }
      },
      
      async loadClassGoods() {
        let res;
        try{
          res = await this.$http.get('http://jspang.com/DemoApi/typeGoods.php')
          this.typeGoods = res.data
          console.log(res)
        }catch(e){
          console.log(e)
        }
      },
      
      addOrderList(goods) {
        this.totalCount = 0;
        this.totalMoney = 0;

        if(this.tableData.length > 0) {
          let data = this.tableData.filter(value => {
            return value.goodsId === goods.goodsId
          })
          
          if(data.length > 0) {
            this.tableData.forEach((value, index) => {
              if(value.goodsId === goods.goodsId) {
                value.count += 1
                this.tableData.splice(index, 1, value)
              }
            })
          } else {
            goods.count = 1
            goods.money = goods.price
            this.tableData.push(goods)
          }
          this.tableData.forEach((value, index) => {
            value.money = value.price*value.count
            this.totalCount = value.count
            this.totalMoney=this.totalMoney+(value.price*value.count);  
            this.tableData.splice(index, 1, value)
          })
        } else {
          this.totalCount += 1
          this.totalMoney += goods.price
          goods.money = goods.price
          this.tableData.push(goods)
          this.tableData.forEach(value => {
            value.count = 1
          })
        }

      },
      
      //添加
      add(index, row) {
        console.log(row)
        row.count += 1
        row.money = row.count * row.price
        this.tableData.splice(index, 1, row)
      },
      
      //减少
      decrease(index, row) {
        console.log(row)
        row.count -= 1
        if(row.count == 0) {
          this.tableData.splice(index, 1)
        } else {
          row.money = row.count * row.price
          this.tableData.splice(index, 1, row)
        }
        
      },
      
      //删除商品
      deleteProduct(index, row) {
        this.tableData.splice(index, 1)
      },
      
      //删除所有
      deleteAll() {
        this.tableData = []
        this.totalCount = 0
        this.totalMoney = 0
      },
      
      checkout() {
        if (this.totalCount!=0) {
          this.tableData = [];
          this.totalCount = 0;
          this.totalMoney = 0;
          this.$message({
              message: '结账成功，感谢你又为店里出了一份力!',
              type: 'success'
          });
        }else{
          this.$message.error('不能空结。老板了解你急切的心情！');
        }
      
      },
      
      pendingOrder() {
        const tableData = JSON.stringify(this.tableData)
        localStorage.setItem('tableData', tableData)
      }
      
      
      
    }
  }
</script>

<style lang="less" scoped>
   .title{
       height: 20px;
       line-height: 20px;
       background-color: #F9FAFC;
       padding: 10px;
       position: relative;
   }
   
   .title:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #e4e7ed;
    z-index: 1;
   }
   .often-goods-list {
     background-color: #F9FAFC;
     &:after {
       content: '';
       clear: both;
       display: block;
     }
     ul {
      &:after {
       content: '';
       clear: both;
       display: block;
     }
            margin: 0;
       padding-top: 10px;
       padding-bottom: 10px;
      li{
        list-style: none;
        float:left;
        border:1px solid #E5E9F2;
        padding:10px;
        margin:5px;
        background-color:#fff;
      } 
     }
   }
  .o-price{
      color:#58B7FF; 
   }
  .cookList {
    display: flex;
    flex-wrap: wrap;
    li {
       list-style: none;
       width:31%;
       border:1px solid #E5E9F2;
       height: auot;
       overflow: hidden;
       background-color:#fff;
       padding: 2px;
       margin: 2px;
       span {
         display: block;
       }      
    }
  }
   .foodImg{
      width: 40%;
      padding-left: 10px;
   }
   .foodName{
       font-size: 18px;
       padding-left: 10px;
       color:brown;

   }
   .foodPrice{
       font-size: 16px;
       padding-left: 10px;
       padding-top:10px;
   }
   .table-product {
     margin: 15px 0;
   }
   .btn-container {
     text-align: center;
   }
</style>