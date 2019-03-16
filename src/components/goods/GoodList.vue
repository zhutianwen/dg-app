<template>
   <div class="app-goodlist">
   <!--商品的项目-->
   
      <div class="goods-item" v-for="item in list" :key="item.lid">
        <img :src="'http://127.0.0.1:3000/'+item.photo" @click="jumpInfo" :data-lid="item.lid"/>
        <h4>{{item.title}}</h4>
        <div class="info">
           <span class="now">{{item.price}}</span>
        </div>
        <div class="sell">
           <span>热卖中</span>
        </div>
      </div>
      <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
      <br><br><br><br><br><br><br><br><br>
   </div>
   
</template>

<script>
export default {
  data(){
     return{
       pno:0,
       pageSize:4,
       list:[]  
     }
  },
  created() {
     this.getMore(); 
  },
  methods:{
    jumpInfo(e){
      var lid=e.target.dataset.lid;
      this.$router.push("/GoodInfo?pid="+lid)
    },
        getMore(){
          this.pno++;  
          var url=`http://127.0.0.1:3000/products?pno=${this.pno}&pageSize=${this.pageSize}`;
          this.axios.get(url).then(result=>{
            var rows=this.list.concat(result.data.data);
            this.list=rows;
          })  
        } 
     }
}
</script>

<style>
/*外层父元素*/
   .app-goodlist{
      display:flex;
      flex-wrap:wrap;
      justify-content:space-between;
      padding:4px;
   } 
/*商品项*/
 .app-goodlist .goods-item{
     display:flex;
     flex-direction:column;
     justify-content:space-between;
     min-height:180px;
     width:50%;
     border:1px solid #ccc;
     box-shadow:0 0 8px #ccc;
     margin:4px 0;
     padding:2px;
 }
 .app-goodlist .goods-item img{
     width:100%;
 }
 .app-goodlist .goods-item h4{
     font-size:15px;
 } 
 .app-goodlist .goods-item .now{
     color:red;
     font-size:16px;
     font-weight:bold;
 }  
</style>