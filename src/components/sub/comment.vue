<template>
   <div class="app-comment">
     <div class="mui-card">
				<div class="mui-card-header"></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
					   <textarea v-model="msg" placeholder="最多发表120个字" max-length="120">
                       </textarea>
                       <mt-button @click="addcomment" size="large" type="primary">发表评论</mt-button>
					</div>
				</div>
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner" v-for="(item,i) in list" :key="item.id">
					<div>第{{i+1}}楼 发表时间:{{item.ctime | dateFilter}}</div>
           <div>{{item.content}}</div>
                       
					</div>
          <br>
				</div>
			</div>
			</div>
   </div>
</template>

<script>
//引入提示框
import {Toast} from "mint-ui"

export default {
   data(){
      return{
          pno:0,
          pageSize:5,
          list:[],
          msg:""//双向绑定的内容
      } 
   },
   created(){
     this.getMore();
     //this.addcomment();
   },
   methods:{
     addcomment(){
       var m=this.msg;
       //trim 去除字符串两端的空格
       var size=m.trim().length;
       if(size==0){
         Toast("内容不能为空");
         return;  
       }
       var nid=this.$route.query.nid
       //console.log(nid)

       //1.创建参数
       var postData=this.qs.stringify({
         nid:nid,
         content:this.msg
       });
       //2.发送post 请求
       var url="http://127.0.0.1:3000/addcomment";
       //3.接收返回数据
       this.axios.post(url,postData).then(result=>{
         //console.log(result.data)
         //提示框
         Toast(result.data.msg);
         //清空提示框
         this.msg="";
         //清空页码
         this.pno=0;
         //清空原有数组
         this.list=[];
         //立即查看评论结果
         this.getMore();
       })
       //4.
     },
     getMore(){
       this.pno++;
       var url=`http://127.0.0.1:3000/getComment?nid=${this.$route.query.nid}&pno=${this.pno}&pageSize=${this.pageSize}`;
        this.axios.get(url).then(result=>{
          //console.log(result.data);
          var rows=this.list.concat(result.data.data);
          this.list=rows 
         
        })
     }  
   } 
}
</script>

<style>
  
</style>
