import Router from "@koa/router";
import ssrRouter from "./ssr";

const router = new Router();

router.use("/ssr", ssrRouter.routes());

router.get("/download/buhounlocker.dmg", async (ctx) => {
  const currentTime = Date.now();
  while (Date.now() - currentTime < 1000) {}

  ctx.body = {
    success: true,
  };
});

export default router;
