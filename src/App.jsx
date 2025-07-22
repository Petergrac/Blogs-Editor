import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import routes from "./routes/routes";
import { lazy, Suspense } from "react";
const Loading = lazy(()=> import('./components/loadingComponent'));
const router = createBrowserRouter(routes);

function App() {
  return (
      <QueryClientProvider client={new QueryClient()}>
       <Suspense fallback={<Loading />}>
         <RouterProvider router={router} />
       </Suspense>
      </QueryClientProvider>
  );
}
export default App;
