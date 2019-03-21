<template>
   <h3>退出登录</h3>
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data(){
      return{}
    },
  created() {
    var url="http://127.0.0.1:3000/logout";  
    this.axios.get(url).then(res=>{
       Toast("已退出") 
    })
     this.$store.commit("updateCount",0)
  }, 
}
</script>
<style>
    
</style>