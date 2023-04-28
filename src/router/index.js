import Router from "@koa/router";
import ssrRouter from "./ssr";

const router = new Router();

router.use('/ssr', ssrRouter.routes())

export default router;
