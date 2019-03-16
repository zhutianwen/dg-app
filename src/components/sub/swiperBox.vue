<template>
   <div class="app-swiperbox">
	
        <mt-swipe :auto="3000">
           <mt-swipe-item v-for="item in list" :key="item.id">
              <img :src="item.img_url"/>
           </mt-swipe-item>
        </mt-swipe>
   </div>
</template>

<script>
export default {
    data(){
        return{}
    },
    props:["list"]//接收父组件数据
}

</script>

<style>
   .app-swiperbox .mint-swipe{
       height:180px;
   } 
   .app-swiperbox .mint-swipe img{
       height:180px;
       width:100%;
   }
</style>