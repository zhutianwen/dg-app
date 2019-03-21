<template>
   <div class="app-shopcart">
      <div class="mui-card">
				<div class="mui-card-header">
                <h4>购物车列表</h4>
                   <h4>
                   <!--allcb全选状态true选中 false清空-->
                    全选 <input type="checkbox" @click="selectAll" :checked="allcb"/>
                    </h4>
                </div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                   <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,i) in list" :key="item.id">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" :src="item.photo">
						<div class="mui-media-body">
							<p class='mui-ellipsis'>
                               <input type="checkbox" :checked="item.cb" :data-i="i" @click="modifyItem">
							   {{item.lname}}
                               {{item.price}}
                               <button @click="deleteItem" :data-id="item.id" :data-idx="i">删除</button>
                            </p>
						</div>
					</a>
				</li>
                </ul>	
				</div>
			</div>
		 <div class="mui-card-footer">
         <button @click="removeItem">删除选中商品</button>
           小计:￥60.00
         </div>
		</div>
   </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return{
          list:[], //保存购物车列表 
          cb:false,
          allcb:false //保存全选复选框状态 
        }
    },
    methods: {
      deleteItem(e){
        var id=e.target.dataset.id;
        var idx=e.target.dataset.idx;
        var url="http://127.0.0.1:3000/delCartItem?id="+id;
        this.axios.get(url).then(result=>{
          if(result.data.code==1){
              Toast("删除成功");
              this.list.splice(idx,1)
          }  
        })  
      },  
      loadMore(){
        //1.创建变量保存url
        var url="http://127.0.0.1:3000/cartlist?uid=1";
        //2.发送ajax请求  
        this.axios.get(url).then(result=>{
           //判断如果没有登录显示消息
           if(result.data.code==-1){
               Toast("请登录")
               return;
           }

           //1.接收服务器程序返回数据
           var rows=result.data.data;//购物车返回的数组
           console.log(rows.length);
           //修改全局购物车数量
          this.$store.commit("updateCount",rows.length)
           //2.为每一个商品对象添加属性cb
           for(var item of rows){
               item.cb=false;
           }
           //3.将最终数组赋值list列表
           this.list=rows;
        })
      },
      selectAll(e){
          //获取当前复选框状态
        var cb=e.target.checked;
        //修改全选状态
        this.allcb=cb;
        //console.log(cb)
       for(var item of this.list){
           item.cb=cb
       }
      },
      modifyItem(e){
          //获取下标
          var idx=e.target.dataset.i
          console.log(idx)
          //将下标对象数组中元素cb修改当前复选状态
          var checked=e.target.checked;
          //将数组中对应cb状态修改
          this.list[idx].cb=checked;
          //统计一下购物车中商品选中的数量
          //将全选状态true
          var count=0;
          for(var item of this.list){
              if(item.cb){
                  count++;
              }
          }
          if(count==this.list.length){
              this.allcb=true
          }else{
              this.allcb=false
          }
      },
      removeItem(){
          var html="";
          //遍历数组中的元素
          for(var item of this.list){
           //判断cb==true
           if(item.cb){
          //保存id
          html+=item.id+","
           }
          }
          html=html.substring(0,html.length-1)
          //console.log(html)
        //发送ajax请求  
        var url="http://127.0.0.1:3000/removeItem?ids="+html;
        this.axios.get(url).then(result=>{
            if(result.data.code==1){
               Toast("删除成功")
               this.loadMore(); 
            }
        })
      } 
    },
    created() {
      this.loadMore();  
    },
}
</script>

<style>
    
</style>