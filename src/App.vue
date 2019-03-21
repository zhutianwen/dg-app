<template>
 <div class="app-container">
 <br><br>
<!--添加公共的组件-->
 <mt-header fixed title="豆果美食"></mt-header>
    <router-view></router-view>
    <!--添加公共的组件-->
<nav class="mui-bar mui-bar-tab">
	<router-link to="/Home" class="mui-tab-item mui-active" href="#tabbar">
		<span class="mui-icon mui-icon-home"></span>
			<span class="mui-tab-label">首页</span>
			</router-link>
	<router-link to="/shopCart" class="mui-tab-item" href="#tabbar-with-contact">
		<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
      
        <span class="mui-badge">
           {{$store.getters.optCartCount}}
        </span></span>
		   <span class="mui-tab-label">购物车</span>
			</router-link>
	<router-link to="/Login" class="mui-tab-item" href="#tabbar-with-map">
		<span class="mui-icon mui-icon-person-filled"></span>
		  <span class="mui-tab-label">登录</span>
			</router-link>

            <router-link to="/Logout" class="mui-tab-item" href="#tabbar-with-map">
		<span class="mui-icon mui-icon-person-filled"></span>
		  <span class="mui-tab-label">退出</span>
			</router-link>
            
</nav>
 </div>
 
</template>

<style>
   .app-container{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
   }

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;

}
</style>
