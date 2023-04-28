import koa from "koa";
import cors from "@koa/cors";
import router from "./src/router/index";
import send from 'koa-send';
import path from 'path';

const app = new koa({ proxy: true });

app
  .use(cors({
    origin: '*'

  }))
  // 暴露静态文件夹
  .use(async (ctx, next) => {
    // *先进入 next 让其他的进行处理；这样可以避免所有的请求都被当作是访问静态资源，比如说请求 /ssr 被误以为是访问 ssr 文件夹
    await next();
    // *当被其他处理完成后，再进行过滤
    if (ctx.method !== 'HEAD' && ctx.method !== 'GET') return;
    // *static 开头的就表示在访问静态资源
    if (!ctx.path.startsWith('/static')) return;
    // *这里使用 __dirname, __filename 时要注意：__dirname, __filename 因为这个项目是使用 webpack 打包的，所以最后的 __dirname, __filename 应该是打包后的文件对应的路径
    // *所以我在这里使用了 resolve('.', 'dist/client'); '.' 在 resolve 中就表示根目录；
    // *这里的 ctx.path.replace('/static', '') 不是很严谨
    await send(ctx, ctx.path.replace('/static', ''), { root: path.resolve('.', 'dist/client') })
  })
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(8090, () => {
  console.log('listen to 8090');
});