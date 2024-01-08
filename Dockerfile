# base image
# FROM
FROM node:14

# 创建容器内的项目存放目录
RUN mkdir -p /home/nav

# 先拷贝依赖文件安装依赖，这样可以提高效率
COPY ["package.json", "./"]

# cd到tb-nav文件夹下
WORKDIR /home/nav

# 安装项目依赖包
RUN npm install --registry=https://registry.npmmirror.com/

# 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的nav文件夹下
ADD . /home/nav/

# 容器对外暴露的端口号
EXPOSE 8090

# 开始命令
CMD ["npx", "babel-node", "bin/www"]