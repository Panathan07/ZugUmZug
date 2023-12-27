import { Link } from "react-router-dom";

export function NavigationBar() {
  return (
    <nav className="navbar">
      <div className="map">
        <Link to="/map">Game</Link>
      </div>
      <div className="pointshop">
        <Link to="/shop">Punkteshop</Link>
      </div>
      <div className="login">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
