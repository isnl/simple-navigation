import koaRouter from 'koa-router';
import * as service from '../service/type';
const router = koaRouter();
import { success, error } from '../utils';

/**
 * get type
 */
router.get('/type', async (ctx) => {
  const types = await service.get();
  success(ctx, types);
});
/**
 * add type
 */
router.post('/type', async (ctx, next) => {
  const { body } = ctx.request;
  try {
    const data = await service.add(body);
    success(ctx, data);
  } catch (err) {
    error(ctx, err);
  }
});
router.patch('/type', async (ctx) => {
  const { query, body } = ctx.request;
  const { id } = query;
  try {
    const result = await service.update(id, body);
    success(ctx, result);
  } catch (err) {
    error(err);
  }
});
router.delete('/type', async (ctx, next) => {
  const { query } = ctx.request;
  const { id } = query;
  try {
    const result = await service.remove(id);
    success(ctx, result);
  } catch (err) {
    error(err);
  }
});

export default router;
