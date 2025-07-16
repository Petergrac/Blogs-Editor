import { Suspense, lazy } from "react";
const Login = lazy(() => import("../pages/login"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
];
export default routes;
