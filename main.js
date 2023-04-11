import koa from "koa";
import cors from "@koa/cors";
import router from "./src/router/index";

const app = new koa({ proxy: true });

app.use(cors({
  origin: '*'
})).use(router.routes()).use(router.allowedMethods());


app.listen(8090, () => {
  console.log('listen to 8090');
});