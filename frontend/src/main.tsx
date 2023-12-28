import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import {
  RouterProvider,
  RootRoute,
  Route,
  Router,
} from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.tsx";

import { MapPage } from "./pages/MapPage";
import { PointShop } from "./pages/PointShop";
import { Login } from "./pages/LoginPage";

const rootRoute = new RootRoute({
  component: App,
});
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    return (
      <>
        <h1>Home</h1>
      </>
    );
  },
});

const mapRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "map",
  component: MapPage,
});
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "login",
  component: Login,
});
const shopRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "shop",
  component: PointShop,
});

const routeConfig = rootRoute.addChildren([
  indexRoute,
  mapRoute,
  shopRoute,
  loginRoute,
]);

const router = new Router({ routeTree: routeConfig });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
