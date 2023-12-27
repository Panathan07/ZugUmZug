import { Routes, Route } from "react-router-dom";
import { MapPage } from "./pages/MapPage";
import { PointShop } from "./pages/PointShop";
import { Login } from "./pages/LoginPage";
import { useUserID } from "./hooks/useUserID";
import { useEffect } from "react";
import { NavigationBar } from "./pages/Navigation";

export default function App() {
  const [userID, setUserID, userIDInTeam] = useUserID(
    "http://localhost:3000/userID/instantiate"
  );
  useEffect(() => {
    console.log(userID, userIDInTeam);
  }, [userID, userIDInTeam]);

  return (
    <>
      {/* <NavigationBar /> */}
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/shop" element={<PointShop />} />
        </Routes>
      </div>
    </>
  );
}
