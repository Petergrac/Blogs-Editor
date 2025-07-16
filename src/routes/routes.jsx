import { Children, Suspense, lazy } from "react";
const Login = lazy(() => import("../pages/login"));
const Home = lazy(()=> import("../pages/home"));
const Published = lazy(()=> import("../components/published"));
const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
    children:[
        {
            path: '',
            index: true,
            element:(
                <Suspense fallback={<div>Loading...</div>}>
                    <Published />
                </Suspense>
            )
        }
    ]
  },
];
export default routes;
