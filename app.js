//app.js
//1:加载模块 express pool.js
const express = require("express");
const pool = require("./pool");
//2:创建服务器端对象
var app = express();
//3:监听 3000
app.listen(3000);
//4:指定静态目录  public 
app.use(express.static("public"));
//5.加载跨域访问模块
const cors=require("cors");
//6.配置跨域访问模块 哪个域名跨域访问允许
//脚手架8080允许
//origin 允许跨域访问域名列表
//credentials 跨域访问保存session 
app.use(cors({
  origin:["http://127.0.0.1:8080","http://localhost:8080"],
  credentials:true
}));
//6.1 下载 express-session 并且配置
const session=require("express-session");
app.use(session({
  secret:"128位随机字符",//安全字符串
  resave:false,//每次请求是否都更新数据
  saveUninitialized:true,//初始化保存数据
  cookie:{
    maxAge:1000*60*60*8
  }
}));


//7.加载第三方模块  body-parser
// body-parser 针对post请求处理参数
//如果配置成功req.body
const bodyParser=require("body-parser")
//8.配置对特殊  json是否自动转换 不转
app.use(bodyParser.urlencoded({extended:false}))


//功能一:home 组件轮播图片

app.get("/imageList",(req,res)=>{
   //1:将轮播图中所需图片 复制public/img
   //2:查询
   var list = [
     {id:1,img_url:"http://127.0.0.1:3000/img/1.jpg"},
     {id:2,img_url:"http://127.0.0.1:3000/img/2.jpg"},
     {id:3,img_url:"http://127.0.0.1:3000/img/3.jpg"},
     {id:4,img_url:"http://127.0.0.1:3000/img/4.jpg"},
   ];
   res.send(list); 
});

//功能二  获取新闻列表
app.get("/newslist",(req,res)=>{
  //1.获取参数
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  //2.设置默认值
  if(!pno){
    pno=1; 
  }
  if(!pageSize){
    pageSize=7;
  }
  //3.创建sql语句
  var sql="SELECT id,title,img_url,ctime,point FROM douguo_news LIMIT ?,?";
  var ps=parseInt(pageSize);
  var offset=(pno-1)*pageSize;
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
  })
  //4.返回
})


//功能三 商品的分页显示
app.get("/products",(req,res)=>{
  //1.获取参数
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  if(!pno){
    pno=1; 
  }
  if(!pageSize){
    pageSize=4;
  }
  //2.sql
 var sql="SELECT l.lid,l.title,l.price,p.photo FROM douguo_laptop l,douguo_laptop_pic p WHERE l.lid=p.laptop_id GROUP BY l.lid LIMIT ?,?";
  //3.json
  var offset=(pno-1)*pageSize;
  var ps=parseInt(pageSize);
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
})

//功能四 获取新闻信息
app.get("/findNewsInfo",(req,res)=>{
  //1.获取参数
  var id=req.query.id;
 // console.log(id);
  //2.创建正则表达式
  var reg=/^\d{1,}$/;
  //3.如果验证失败 输出错误信息
  if(!reg.test(id)){
    res.send({code:-1,msg:'新闻编号有误'})
    return;
  }
  //4.创建sql语句
  var sql="SELECT id,title,content,ctime,img_url FROM douguo_news WHERE id=?";
  //5.发送sql语句
  pool.query(sql,[id],(err,result)=>{
    if(err) throw err
    res.send({code:1,data:result});
  })
  //6.输出查询结果
})

//功能五  获取品论列表
app.get("/getComment",(req,res)=>{
  var nid=req.query.nid;
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  if(!pno){pno=1}
  if(!pageSize){pageSize=5}
  var sql="SELECT id,content,ctime,nid FROM douguo_comment WHERE nid=? ORDER BY ctime DESC LIMIT ?,?";
  var offset=(pno-1)*pageSize;
  pageSize=parseInt(pageSize);
  pool.query(sql,[nid,offset,pageSize],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
  })
})

//功能六 发表评论
app.post("/addcomment",(req,res)=>{
  var nid=req.body.nid;
  var content=req.body.content
  var sql="INSERT INTO douguo_comment VALUES(null,?,now(),?)";
  pool.query(sql,[content,nid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
       res.send({code:1,msg:"发表成功"})
    }else{
      res.send({code:-1,msg:"发表失败"})
    }
   
  })
})

//功能七 获取商品详细信息
app.get("/findProduct",(req,res)=>{
  var pid=req.query.pid;
  var sql="SELECT lname,price FROM douguo_laptop WHERE lid=?";
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
})

//功能八 用户登录
app.get("/login",(req,res)=>{
  var uname=req.query.uname;
  var upwd=req.query.upwd;
  var sql="SELECT uid FROM douguo_user WHERE uname=? AND upwd=md5(?)";
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err
    if(result.length==0){
      res.send({code:-1,msg:"用户名或密码有误"})
    }else{
      将用户登录凭证保存在服务器端
       var id=result[0].uid;
       req.session.uid=id;
       console.log(req.session.uid)
       res.send({code:1,msg:"登陆成功"})
    }
  })
})

//功能九 将商品添加至购物车
app.get("/addcart",(req,res)=>{
  //pid 商品编号 uid 用户编号
  var pid=parseInt(req.query.pid);
  var count=1;
  var uid=parseInt(req.query.uid);
  var price=parseInt(req.query.price);

  var sql="SELECT id FROM douguo_cart WHERE uid=? AND pid=?";
  pool.query(sql,[uid,pid],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      var sql=`INSERT INTO douguo_cart VALUES(null,'1',${price},${pid},${uid})`;
    }else{
      var sql=`UPDATE douguo_cart SET count=count+1 WHERE pid=${pid} AND uid=${uid}`
    }
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      //res.send(result)
      if(result.affectedRows>0){
        res.send({code:1,msg:"添加成功"})
      }else{
        res.send({code:-1,msg:"添加失败"})
      }

    })
  })
})

//功能十 购物车列表
app.get("/cartlist",(req,res)=>{
  var uid=req.session.uid;
  var sql="SELECT c.id,c.count,c.price,c.uid,c.pid,l.lname,p.photo FROM douguo_cart c,douguo_laptop l,douguo_laptop_pic p WHERE l.lid=c.pid AND p.pid=c.pid AND c.uid=?";

  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result})
  })
})

//功能十一 删除购物车中意见商品
app.get("/delCartItem",(req,res)=>{
  var id=req.query.id;
  var sql="DELETE FROM douguo_cart WHERE id=?";
pool.query(sql,[id],(err,result)=>{
  if(err) throw err;
  if(result.affectedRows>0){
    res.send({code:1,msg:"删除成功"})
  }else{
    res.send({code:-1,msg:"删除失败"})
  }
})
})

//功能十二  删除购物车中多个商品
app.get("/removeItem",(req,res)=>{
  var ids=req.query.ids;
  var sql="DELETE FROM douguo_cart WHERE id IN ("+ids+")";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"})
    }else{
      res.send({code:-1,msg:"删除失败"})
    }
  })
})