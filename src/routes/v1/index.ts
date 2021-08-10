// libs
import express from "express";
// routes
import appRoutes from "./appRoutes";
import docsRoute from "./docs";
// others
import config from "@/config";

const router = express.Router();

appRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  // routes available only in development mode
  router.use("/docs", docsRoute);
}

export default router;
