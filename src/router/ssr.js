import React from 'react';
import Router from "@koa/router";
import App from "../client/components/App";
import { renderToString } from "react-dom/server";

const router = new Router();

router.get('/', ctx => {
  const html = renderToString(<App />);
  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>test</title>  
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
  `
})

export default router;
