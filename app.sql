SET NAMES UTF8;
DROP DATABASE IF EXISTS douguo;
CREATE DATABASE douguo CHARSET=UTF8;
USE douguo;

/**用户信息**/
CREATE TABLE douguo_user(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(32),
    upwd VARCHAR(32),
    phone VARCHAR(11),
    email VARCHAR(32)
);
/**用户信息**/
INSERT INTO douguo_user VALUES
(NULL,'当当',md5(123456),13122222222,'dang@123.com'),
(NULL,'丁丁',md5(123459),13322222222,'ding@123.com'),
(NULL,'毛毛',md5(123455),13422222222,'mao@123.com'),
(NULL,'皮皮',md5(123457),13522222222,'pi@123.com');


/****首页轮播广告商品****/
CREATE TABLE douguo_index_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128)
);

INSERT INTO douguo_index_carousel VALUES
(NULL, 'img/index/1.jpg'),
(NULL, 'img/index/2.jpg'),
(NULL, 'img/index/3.jpg'),
(NULL, 'img/index/4.jpg');

/*创建新闻列表*/
CREATE TABLE douguo_news(
   id INT PRIMARY KEY AUTO_INCREMENT,
   title VARCHAR(255),
   img_url VARCHAR(255),
   ctime DATETIME,
   point INT,
   content VARCHAR(2000)
);

INSERT INTO douguo_news VALUES
(null,'标题','http://127.0.0.1:3000/1.png',now(),0,'内容'),
(null,'标题2','http://127.0.0.1:3000/1.png',now(),0,'内容'),
(null,'标题3','http://127.0.0.1:3000/1.png',now(),0,'内容'),
(null,'标题4','http://127.0.0.1:3000/1.png',now(),0,'内容'),
(null,'标题5','http://127.0.0.1:3000/1.png',now(),0,'内容'),
(null,'标题6','http://127.0.0.1:3000/1.png',now(),0,'内容'),
(null,'标题7','http://127.0.0.1:3000/1.png',now(),0,'内容'),
(null,'标题8','http://127.0.0.1:3000/1.png',now(),0,'内容'),
(null,'标题9','http://127.0.0.1:3000/1.png',now(),0,'内容'),
(null,'标题10','http://127.0.0.1:3000/1.png',now(),0,'内容');


/**商品**/
CREATE TABLE douguo_laptop_family(
  fid INT PRIMARY KEY AUTO_INCREMENT,
  fname VARCHAR(32)
);

/**商品分类家族**/
INSERT INTO douguo_laptop_family VALUES
(NULL,'肉类'),
(NULL,'海鲜类'),
(NULL,'河鲜类'),
(NULL,'家禽类'),
(NULL,'蔬菜类'),
(NULL,'水果类');



/**商品分类**/
CREATE TABLE douguo_laptop(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  family_id INT,              #所属类型家族编号
  title VARCHAR(128),         #主标题
  price DECIMAL(10,2),        #价格
  promise VARCHAR(64),        #服务承诺
  lname VARCHAR(32),          #商品名称
  sold_count INT            #已售出的数量
);

/**牛肉**/
INSERT INTO douguo_laptop VALUES
(1,1,'牛排',69,'*退货补运费 *48小时快速退款 *72小时发货','牛排','300'),
(2,7,'牛排',69,'*退货补运费 *48小时快速退款 *72小时发货','牛排','300'),
(3,7,'牛排',69,'*退货补运费 *48小时快速退款 *72小时发货','牛排','300'),
(4,6,'牛排',69,'*退货补运费 *48小时快速退款 *72小时发货','牛排','300'),
(5,6,'牛排',69,'*退货补运费 *48小时快速退款 *72小时发货','牛排','300'),
(6,5,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(7,5,'牛排',69,'*退货补运费 *48小时快速退款 *72小时发货','牛排','300'),
(8,4,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(9,4,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(10,1,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(11,1,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(12,2,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(13,2,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(14,1,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(15,1,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(16,3,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(17,3,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(18,3,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(19,1,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300'),
(20,3,'牛排',69,'*退货补运费  *48小时快速退款 *72小时发货','牛排','300');



/**商品图片**/
CREATE TABLE douguo_laptop_pic(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  laptop_id INT,              #商品图片编号
  photo VARCHAR(128)           #图片路径
  
);

INSERT INTO douguo_laptop_pic VALUES
(NULL, 1, 'img/product/5.jpg'),
(NULL, 2, 'img/product/5.jpg'),
(NULL, 1, 'img/product/5.jpg'),
(NULL, 1, 'img/product/5.jpg'),
(NULL, 2, 'img/product/5.jpg'),
(NULL, 3, 'img/product/5.jpg'),
(NULL, 4, 'img/product/5.jpg'),
(NULL, 4, 'img/product/5.jpg'),
(NULL, 5, 'img/product/5.jpg'),
(NULL, 4, 'img/product/5.jpg'),
(NULL, 6, 'img/product/5.jpg'),
(NULL, 9, 'img/product/5.jpg'),
(NULL, 7, 'img/product/5.jpg'),
(NULL, 7, 'img/product/5.jpg'),
(NULL, 6, 'img/product/5.jpg'),
(NULL, 9, 'img/product/5.jpg'),
(NULL, 6, 'img/product/5.jpg'),
(NULL, 9, 'img/product/5.jpg'),
(NULL, 8, 'img/product/5.jpg'),
(NULL, 10, 'img/product/5.jpg'),
(NULL, 6, 'img/product/5.jpg'),
(NULL, 6, 'img/product/5.jpg'),
(NULL, 11, 'img/product/5.jpg'),
(NULL, 11, 'img/product/5.jpg'),
(NULL, 12, 'img/product/5.jpg'),
(NULL, 12, 'img/product/5.jpg'),
(NULL, 13, 'img/product/5.jpg'),
(NULL, 13, 'img/product/5.jpg'),
(NULL, 13, 'img/product/5.jpg'),
(NULL, 15, 'img/product/5.jpg'),
(NULL, 15, 'img/product/5.jpg'),
(NULL, 16, 'img/product/5.jpg'),
(NULL, 16, 'img/product/5.jpg'),
(NULL, 14, 'img/product/5.jpg'),
(NULL, 14, 'img/product/5.jpg'),
(NULL, 17, 'img/product/5.jpg'),
(NULL, 17, 'img/product/5.jpg'),
(NULL, 18, 'img/product/5.jpg'),
(NULL, 18, 'img/product/5.jpg'),
(NULL, 11, 'img/product/5.jpg'),
(NULL, 20, 'img/product/5.jpg'),
(NULL, 20, 'img/product/5.jpg'),
(NULL, 11, 'img/product/5.jpg'),
(NULL, 18, 'img/product/5.jpg'),
(NULL, 19, 'img/product/5.jpg'),
(NULL, 19, 'img/product/5.jpg'),
(NULL, 6, 'img/product/5.jpg');


/*品论表*/
CREATE TABLE douguo_comment(
  id INT PRIMARY KEY AUTO_INCREMENT,
  content VARCHAR(388),
  ctime DATETIME,
  nid INT
);
INSERT INTO douguo_comment VALUES
(null,'点赞1次',now(),2),
(null,'点赞5次',now(),2),
(null,'点赞16次',now(),2),
(null,'点赞31次',now(),2),
(null,'点赞51次',now(),2),
(null,'点赞21次',now(),2),
(null,'点赞11次',now(),2),
(null,'点赞21次',now(),2),
(null,'点赞31次',now(),2),
(null,'点赞41次',now(),2),
(null,'点赞21次',now(),2);

/*购物车*/
CREATE TABLE douguo_cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  count INT,
  price DECIMAL(10,2),
  pid INT,
  uid INT
);