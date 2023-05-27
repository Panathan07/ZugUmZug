import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import PointShop from "./pages/PointShop";

export default function App() {
  return (
    <Routes>
      <Route path="/map" element={<Home />} />
      <Route path="/shop" element={<PointShop />} />
    </Routes>
  );
}
