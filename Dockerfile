# base image
# FROM
FROM node:alpine

# 设置工作目录
WORKDIR /usr/src/nav

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install --registry=https://registry.npmmirror.com/

# 复制应用程序源代码到工作目录
COPY . .

# 容器对外暴露的端口号
EXPOSE 8090

# 开始命令
CMD ["npm", "run", "start"]