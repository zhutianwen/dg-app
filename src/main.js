import Vue from 'vue'
import App from './App.vue'
import router from './router'
//1.引入mint-ui 样式文件
import'mint-ui/lib/style.css'

Vue.config.productionTip = false
//2.引入 mui 库样式文件
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//3.引入mint-ui组件 Header
import {Header,Swipe,SwipeItem,Button} from "mint-ui"
//4.注册Header组件
//Header.name mt-header
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button);
//5.引入  axios库
import axios from "axios"
//6. 配置跨域访问保存session
axios.defaults.withCredentials=true;
//7.  将axios库配置Vue 实例对象中
Vue.prototype.axios=axios;
//7.1 加载第三方模块
import qs from "qs"
//7.2 配置qs模块 qs成功Vue属性
Vue.prototype.qs=qs;

//8.创建日期过滤器
Vue.filter("datetimeFilter",function(val){
    //创建日期对象
    var date=new Date(val);
    //获取年月日时分秒
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    var d=date.getDate();
    var h=date.getHours();
    var mi=date.getMinutes();
    var s=date.getSeconds();
    //返回字符串y-m-d  h:mi:s
    m<10&&(m="0"+m); 
    d<10&&(d="0"+d);
    return `${y}-${m}-${d} ${h}:${mi}:${s}`; 
});
//9.创建日期过滤器
Vue.filter("dateFilter",function(val){
  //创建日期对象
  var date=new Date(val);
  //获取年月日时分秒
  var y=date.getFullYear();
  var m=date.getMonth()+1;
  var d=date.getDate();
  return `${y}-${m}-${d} `
});









new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
