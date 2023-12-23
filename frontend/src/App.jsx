import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import PointShop from "./pages/PointShop";
import Login from "./pages/LoginPage";
import fs from "fs";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useState } from "react";
import { useEffect } from "react";
import { getUUIDFromServer } from "./utilityFunctions/getUUIDFromServer";

export default function App() {
  const [UUID, setUUID] = useLocalStorage("uuid", false);

  if (UUID) {
    return (
      <Routes>
        <Route path="/map" element={<Home />} />
        <Route path="/shop" element={<PointShop />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    );
  }
}

// isipused(IP)

function isipused(IP) {
  fetch("http://localhost:3000/teams")
    .then((response) => {
      return response.json();
    })
    .then((teams) => {
      for (let team of teams.teams) {
        if (team.members.includes(IP)) {
          let user_team = {
            team: team.color,
          };
          let data = JSON.stringify(user_team);
          fs.writeFile("user_data.json", data, (error) => {
            // throwing the error
            // in case of a writing problem
            if (error) {
              // logging the error
              console.error(error);

              throw error;
            }
          });
          return true;
        }
        return false;
      }
    });
}

function isUUIDInTeam(UUID) {}
