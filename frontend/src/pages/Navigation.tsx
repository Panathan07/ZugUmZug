import { Link, Outlet } from "@tanstack/react-router";
import "../assets/css/navbar.css";
import { useState } from "react";
import React from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

export function NavigationBar() {
  const [isActive, setIsActive] = useState(false);

  const navbarClasses = `navbar ${isActive ? "active" : ""}`;

  return (
    <>
      <div className="show-navbar button"></div>
      <nav className={navbarClasses}>
        <div className="navbar-wrapper">
          <section className="navbar-header">
            <div className="menu"></div>
          </section>
          <section className="navbar-content">
            <div className="route">
              <Link to="/map">Game</Link>
            </div>
            <div className="route">
              <Link to="/shop">Punkteshop</Link>
            </div>
            <div className="route">
              <Link to="/login">Login</Link>
            </div>
          </section>
        </div>
        <Outlet />
        <TanStackRouterDevtools />
      </nav>
    </>
  );
}
