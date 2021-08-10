import { version } from "../../package.json";
import config from "@/config";

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Rx API documentation",
    version,
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

export default swaggerDef;
