import { Link, Outlet } from "react-router-dom";
import "@assets/css/navbar.css";
import { useState } from "react";
import { NavbarLink } from "@customTypes/navbarLink";

export function NavigationBar() {
  const [isActive, setIsActive] = useState(false);

  const navbarClasses = `navbar ${isActive ? "active" : ""}`;
  const links: NavbarLink[] = [
    { route: "map", description: "Game" },
    { route: "shop", description: "Punkteshop" },
    { route: "task-manager", description: "Tasks" },
  ];

  return (
    <>
      <div
        className="show-navbar-button"
        onClick={() => setIsActive((prev) => !prev)}
      ></div>
      <nav className={navbarClasses}>
        <section className="link-wrapper">
          {links.map((link) => (
            <div className="route">
              <Link to={link.route}>{link.description}</Link>
            </div>
          ))}
        </section>
      </nav>
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
}
