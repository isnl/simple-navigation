一个简易且精美的私有化内网导航系统，所见即所得，快速安装部署

使用 Koa + Nedb + Swig + Vue2 技术栈开发, Nodejs 版本推荐：  `v14.x`


## 演示

### 首页

![首页](https://static.iiter.cn/article/61d9e35d4ba153e9e98e3ad4cf5b183c.png)


### 分类管理

![分类管理](https://static.iiter.cn/article/3394364b8b18b2c53e58174e6073cc6a.png)

### 导航数据管理

![导航数据管理](https://static.iiter.cn/article/690c66b8af0006e685febdae2ee4bd9b.png)

## 主要目录结构

### db

nedb数据库文件:  

`nav.db` 导航数据

`type.db` 分类数据


### public 

静态资源

### routes 

路由配置，渲染视图层，给视图层注入数据或提供API接口

### service

service层，连接数据库，数据的 CRUD

### utils

工具类

### views

swig模板，视图层

### app.js

入口文件




## 安装和部署

### 1.本地开发

安装依赖

```bash
npm install
```

运行

```bash
npm run dev
```

### 2.PM2 

安装依赖  

```bash
npm install
```

启动

```bash
pm2 start npm --name nav -- run dev
```


### 3.Docker

拉取镜像

```bash
docker pull webpeanut/simple_navigation
```

运行

```bash
docker run -d -p 8090:8090 webpeanut/simple_navigation
```