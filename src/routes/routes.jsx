import { Suspense, lazy } from "react";
const Drafts = lazy(() => import("../components/drafts"));
import Loading from "../components/loadingComponent";
import RootLayout from "../layout/RootLayout";
const NotFound = lazy(() => import("../components/NotFound"));
const EditPost = lazy(() => import("../pages/edit"));
const Login = lazy(() => import("../pages/login"));
const Home = lazy(() => import("../pages/home"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const Published = lazy(() => import("../components/published"));
const PostEditor = lazy(() => import("../components/newPost"));
const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loading />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
        children: [
          {
            path: "/home/published",
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <Published />
              </Suspense>
            ),
          },
          {
            path: "/home/new",
            element: (
              <Suspense fallback={<Loading />}>
                <PostEditor />
              </Suspense>
            ),
          },
          {
            path: "/home/drafts",
            element: (
              <Suspense fallback={<Loading />}>
                <Drafts />
              </Suspense>
            ),
          },
          {
            path: "*",
            element: (
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/edit/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <EditPost />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
];
export default routes;
