import React from 'react';
import Router from "@koa/router";
import App from "../client/components/App";
import { renderToString } from "react-dom/server";

const router = new Router();

router.get('/', ctx => {
  // 这样仅仅是把 html 渲染出来了，但是事件啊，其他的 js 啊 统统是没有的，所以还需要加上编译后的 js；
  // *这也是为什么要使用一个 client 一个 server；
  const html = renderToString(<App />);
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>test</title>  
      </head>
      <body>
        <div id="app">${html}</div>
        <!--    将 js 在浏览器中运行，即可绑定事件等；    -->
        <script src="/static/bundle.client.js"></script>
      </body>
    </html>
  `
})

export default router;
