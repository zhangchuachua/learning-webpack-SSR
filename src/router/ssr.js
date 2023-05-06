import React from 'react';
import Router from "@koa/router";
import { renderToString } from "react-dom/server";
import App from "../client/components/App";
import path from "path";
import * as fs from "fs";

const router = new Router();
const htmlPath = path.resolve(process.cwd(), 'dist/client/index.html');
const match = '<% template %/>';

router.get('/', async ctx => {
  // 这样仅仅是把 html 渲染出来了，但是事件啊，其他的 js 啊 统统是没有的，所以还需要加上编译后的 js；
  // *这也是为什么要使用一个 client 一个 server；
  const content = renderToString(<App/>);
  const html = fs.readFileSync(htmlPath, { encoding: 'utf-8' });
  ctx.body = html.replace(match, content);
})

export default router;
