import React from 'react';
import Router from "@koa/router";
import { renderToString } from "react-dom/server";
// react-router-dom 路由同构的教程 https://reactrouter.com/en/main/guides/ssr
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import path from "path";
import * as fs from "fs";
import routes from "../routes";
import createFetchRequest from "./createFetchRequest";

const router = new Router();
const htmlPath = path.resolve(process.cwd(), 'dist/client/index.html');
const match = '<% template %/>';
const handler = createStaticHandler(routes);

router.get('/', async ctx => {
  const fetchRequest = createFetchRequest(ctx.request);
  const context = await handler.query(fetchRequest);
  const router = createStaticRouter(handler.dataRoutes, context);
  const content = renderToString(<StaticRouterProvider context={context} router={router} />)
  // 这样仅仅是把 html 渲染出来了，但是事件啊，其他的 js 啊 统统是没有的，所以还需要加上编译后的 js；
  // *这也是为什么要使用一个 client 一个 server；
  // const content = renderToString(<App/>);
  const html = fs.readFileSync(htmlPath, { encoding: 'utf-8' });
  ctx.body = html.replace(match, content);
})

export default router;
