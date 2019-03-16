<template>
   <div class="app-login">
<div class="mui-card">
	<div class="mui-card-content">
	  <div class="mui-card-content-inner">
		 <form>
        用户姓名: <input type="text" name="uanme" v-model="uname">
        用户密码: <input type="password" name="upwd" v-model="upwd"> 
        <input type="button" value="登录" @click="butLogin">
      </form>			
	</div>
  </div>
</div>     
     



     
   </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return{uname:"",upwd:""}
    },
    methods:{
        butLogin(){
           //1.获取输入的用户名和密码
           var u=this.uname;
           var p=this.upwd;
           //2.验证不能为空
           var reg=/^[\u4e00-\u9fa5]{2,6}$/;
          // var reg1=/^[0-9]{3,8}$/
           if(!reg.test(u)){
               Toast("用户名格式不正确");
               return;
           }
        //     if(!reg1.test(p)){
        //        Toast("密码格式不正确");
        //        return;
        //    }
           //3.发送ajax请求
           var url="http://127.0.0.1:3000/login?uname="+u+"&upwd="+p;
           this.axios.get(url).then(result=>{
               if(result.data.code==1){
                   this.$router.push("/Home")
               }else{
                   Toast("用户名或密码有误")
               }
           })
           //4.失败 显示提示框
           //5.成功 跳转home 
        }
    },
}
</script>

<style>
    
</style>