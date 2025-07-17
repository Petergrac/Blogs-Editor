import { Children, Suspense, lazy } from "react";
import Drafts from "../components/drafts";
const Login = lazy(() => import("../pages/login"));
const Home = lazy(() => import("../pages/home"));
const Published = lazy(() => import("../components/published"));
const PostEditor = lazy(() => import("../components/newPost"));
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
    children: [
      {
        path: "/home/published",
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Published />
          </Suspense>
        ),
      },
      {
        path: "/home/new",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PostEditor />
          </Suspense>
        ),
      },
      {
        path: '/home/drafts',
        element:(
            <Suspense fallback={<div>Loading...</div>}>
                <Drafts />
            </Suspense>
        )
      }
    ],
  },
];
export default routes;
