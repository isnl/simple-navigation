一个简易且精美的私有化内网导航系统，所见即所得，快速安装部署

使用 Koa + Nedb + Swig + Vue2 技术栈开发, Nodejs 版本推荐：  `v14.x`


## 演示

##### 视频演示

<video width="100%" height="auto" controls>
  <source src="./docs/videos/show.mp4" type="video/mp4">
</video>

##### 首页

![首页](./docs/images/home.png)


##### 分类管理

![分类管理](./docs/images/type.png)

##### 导航数据管理

![导航数据管理](./docs/images/nav.png)


## 安装和部署

#### 本地开发

安装依赖

```bash
npm install
```

运行

```bash
npm run dev
```

### PM2 

安装依赖  

```bash
npm install
```

启动

```bash
pm2 start npm --name nav -- run dev
```


#### Docker

构建镜像

```bash
docker build . -t nav
```

运行

```bash
docker run -d --name nav-web -p 8090:8090 nav
```