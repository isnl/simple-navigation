import koaRouter from 'koa-router';
import * as service from '../service/nav';
import * as typeService from '../service/type';
import fs from 'fs';
import path from 'path';
const router = koaRouter();
import { success, error, getUrlInfo } from '../utils';

/**
 * homepage
 */
router.get('/', async (ctx) => {
  let types = await typeService.get();
  types = types.map((item) => ({
    ...item,
    children: [],
  }));
  const navs = await service.get();
  navs.forEach((item) => {
    const typeInfo = types.find((typeInfo) => typeInfo._id === item.type_id);
    if (typeInfo) {
      typeInfo.children.push(item);
    }
  });
  await ctx.render('index.html', { list: types });
});

router.get('/nav', async (ctx) => {
  const navs = await service.get();
  success(ctx, navs);
});
/**
 * add nav
 */
router.post('/nav', async (ctx, next) => {
  const { body } = ctx.request;
  try {
    const data = await service.add(body);
    success(ctx, data);
  } catch (err) {
    error(ctx, err);
  }
});
router.patch('/nav', async (ctx) => {
  const { query, body } = ctx.request;
  const { id } = query;
  try {
    const result = await service.update(id, body);
    success(ctx, result);
  } catch (err) {
    error(err);
  }
});
router.delete('/nav', async (ctx, next) => {
  const { query } = ctx.request;
  const { id } = query;
  try {
    const result = await service.remove(id);
    success(ctx, result);
  } catch (err) {
    error(err);
  }
});

router.get('/urlInfo', async (ctx) => {
  const { url } = ctx.request.query;
  try {
    const result = await getUrlInfo(url);
    if (result) {
      success(ctx, result);
    } else {
      error(ctx, { msg: '解析失败，请手动添加' });
    }
  } catch (err) {
    error(ctx, err);
  }
});
router.post('/upload', async (ctx) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.filepath);
  let filePath =
    path.join(__dirname, '../public/upload') + `/${file.originalFilename}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  success(ctx, {
    url: `/upload/${file.originalFilename}`,
  });
});

// 后台
router.get('/admin-type', async (ctx) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = fs.readFileSync(path.join(__dirname, '../views/admin-type.html'));
});
router.get('/admin-nav', async (ctx) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = fs.readFileSync(path.join(__dirname, '../views/admin-nav.html'));
});
export default router;
