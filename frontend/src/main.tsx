import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.tsx";

import { Login } from "./pages/route-pages/LoginPage.tsx";
import { MapPage } from "./pages/route-pages/MapPage.tsx";
import { PointShop } from "./pages/route-pages/PointShop.tsx";
import { Taskmanager } from "./pages/route-pages/Taskmanager.tsx";
import { Goals } from "./pages/route-pages/ConnectionGoals.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="map" element={<MapPage />} />
      <Route path="shop" element={<PointShop />} />
      <Route path="taskmanager" element={<Taskmanager />} />
      <Route path="goals" element={<Goals />} />
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
