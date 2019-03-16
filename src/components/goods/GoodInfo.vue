<template>
   <div class="app-goodinfo">
    
      <!--轮播图-->
<div class="mui-card">
   <div class="mui-card-content">
	  <div class="mui-card-content-inner">
		<swiper-box :list="rows"></swiper-box>
       		
	</div>
  </div>
</div>
      <!--商品的信息-->
<div class="mui-card">
	<div class="mui-card-header">{{info.lname}}</div>
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
				<p>
          销售价格:{{info.price}}    
        </p>
        购买数量:
        <div class="mui-numbox">
					<button class="mui-btn mui-btn-numbox-minus" type="button" @click="sub">-</button>
					<input class="mui-input-numbox" type="number" value=1 v-model="val"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
				</div>
			</div>
		</div>
	<div class="mui-card-footer">
     <mt-button type="primary" size="small" @click="addcart">加入购物车</mt-button>
  </div>
</div>

      <!--商品的参数-->
   </div>
</template>

<script>
import {Toast} from "mint-ui"
//1.引入子组件
import swiperBox from "../sub/swiperBox.vue"

//3.调用
export default {
    data(){
        return{
          rows:[],//创建数组板寸子组件显示数据
          info:{},  //创建对象保存商品信息
          val:1
        }
    },
    created(){
      this.getImage();
      this.findGoodInfo();  
    },
    methods:{
      sub(){
        if(this.val>1){
          this.val--;
        }
        
      }, 
      add(){
        this.val++;
      },
      findGoodInfo(){
        var url="http://127.0.0.1:3000/findProduct?pid="+this.$route.query.pid;
        this.axios.get(url).then(result=>{
          this.info=result.data.data[0];
          console.log(this.info)
        })
      },
       getImage(){
         var url="http://127.0.0.1:3000/imageList"; 
         this.axios.get(url).then(result=>{
            // console.log(result)
            this.rows=result.data;
         }) 
       },
      addcart(){
         var pid=this.$route.query.pid;
         var price=this.info.price;
         var uid=1;
         var url=`http://127.0.0.1:3000/addcart?pid=${pid}&price=${price}&uid=${uid}`;
         this.axios.get(url).then(result=>{
            if(result.data.code==1){
              Toast("添加成功");
            }else{
              Toast("添加失败");
            } 
         })
      }      
    },
   //2.注册子组件
   components:{
       "swiper-box":swiperBox
   } 
}
//1.父组件发送ajax请求返回图片列表
//2.将列表传子组件

</script>

<style>
    
</style>