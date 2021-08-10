import authRoute from "./auth";
import userRoute from "./user";

const appRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
];

export default appRoutes;
