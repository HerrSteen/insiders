import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import koaSend from 'koa-send';
import { insidersController } from './controllers/getInsiders';

const app = new koa();
const router = new koaRouter();

app.use(koaBody({ enableTypes: ["text", "json"] }));

router.get('/', async (ctx) => {
  await koaSend(ctx, './dist/index.html');
})

router.get('/api/get-insiders', insidersController)

router.get('/assets/:item', async ctx => {
  const { item } = ctx.params;
  await koaSend(ctx, `./dist/assets/${item}`);
})

router.get('/favicon/:item', async ctx => {
  const { item } = ctx.params;
  await koaSend(ctx, `./dist/${item}`);
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaBody());

console.log("Starting server...");
app.listen(3000);
