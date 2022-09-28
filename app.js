import Koa from 'koa';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import co from 'co';
import Swig from 'koa-swig';
import koaBody from 'koa-body';

import indexRouter from './routes/index';
import typeRouter from './routes/type';
const app = new Koa();

// error handler
onerror(app);

app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// koa-body
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
  }),
);

// routes
app.use(indexRouter.routes(), indexRouter.allowedMethods());
app.use(typeRouter.routes(), typeRouter.allowedMethods());

app.context.render = co.wrap(
  Swig({
    // 2. 配置
    root: __dirname + '/views', // 视图文件路径
    autoescape: true, // false:解析模板数据中的html
    cache: false, // 'memory':请用缓存，避免每次刷新页面都去解析模板
    ext: 'html',
  }),
);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
