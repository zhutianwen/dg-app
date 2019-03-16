<template>
   <div class="app-newslist">
      <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
					<router-link :to="'/NewsInfo?nid='+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>
                              <span>{{item.ctime |datetimeFilter}}</span>
                               <span>点击{{item.point}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
       </ul>
       <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>  
        <br><br><br>    
   </div>
</template>

<script>
export default {
  data(){
      return {
        list:[],
        pno:1,  //当前页码
        pageSize:7 //页大小
        }
  },
  methods:{
    //加载更多
    getMore(){
      //1.修改当前页码
      this.pno++;
      //2.发送请求
      var url="http://127.0.0.1:3000/newslist?pno="+this.pno+"&pageSize="+this.pageSize;
      //3.获取下一页数据保存 list
      this.axios.get(url).then(result=>{
        var rows=this.list.concat
         (result.data.data);
         this.list=rows;
      })
    }, 

    getnewsList(){
      var url="http://127.0.0.1:3000/newslist";
    this.axios.get(url).then(result=>{
         //console.log(result.data.data);
            this.list=result.data.data;
    })    
    }     
  },
  created(){
    this.getnewsList();  
  },  
}
</script>

<style>
   /*日期 次数 两端对齐*/
   .app-newslist li .mui-ellipsis{
       display:flex;
       font-size:12px;
       color:blue;
       justify-content:space-between;
   } 
</style>