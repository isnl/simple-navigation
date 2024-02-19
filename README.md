一个简易且精美的私有化内网导航系统，所见即所得，快速安装部署

使用 Koa + Nedb + Swig + Vue2 技术栈开发, Nodejs 版本推荐：  `v14.x`


## 演示

### 首页

![首页](https://static.iiter.cn/article/773defb5c0fbe572f9ebf7f4c49472a8.png)


### 分类管理

![分类管理](https://static.iiter.cn/article/3394364b8b18b2c53e58174e6073cc6a.png)

### 导航数据管理

![导航数据管理](https://static.iiter.cn/article/690c66b8af0006e685febdae2ee4bd9b.png)



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