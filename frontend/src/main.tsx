import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import {
  RouterProvider,
  RootRoute,
  Route,
  Router,
} from "@tanstack/react-router";

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
