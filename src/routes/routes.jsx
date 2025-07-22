import { lazy } from "react";
const Drafts = lazy(() => import("../components/drafts"));
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
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "",
            index: true,
            element: <Published />,
          },
          {
            path: "new",
            element: <PostEditor />,
          },
          {
            path: "drafts",
            element: <Drafts />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      {
        path: "/edit/:id",
        element: <EditPost />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
export default routes;
