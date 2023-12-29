import { Link, Outlet } from "react-router-dom";
import "../assets/css/navbar.css";
import { useState } from "react";

export function NavigationBar() {
  const [isActive, setIsActive] = useState(false);

  const navbarClasses = `navbar ${isActive ? "active" : ""}`;

  return (
    <>
      <div
        className="show-navbar-button"
        onClick={() => setIsActive((prev) => !prev)}
      ></div>
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
      </nav>
      <Outlet />
    </>
  );
}
