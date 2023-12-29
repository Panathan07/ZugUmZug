import React from "react";
import "../assets/css/login.css";
import { useTeamData } from "../hooks/useTeamData";

export function Login() {
  // const teams = useTeamData("http://localhost:3000/teams");

  return (
    <div className="login-grid">
      <section
        className="team-card"
        style={{ "--_color": "blue" } as React.CSSProperties}
      >
        <div className="team-name">Team Blau</div>
        <div className="current-members">Aktuelle Mitglieder():</div>
      </section>
      <section
        className="team-card"
        style={{ "--_color": "green" } as React.CSSProperties}
      >
        <div className="team-name">Team Grün</div>
      </section>
      <section
        className="team-card"
        style={{ "--_color": "yellow" } as React.CSSProperties}
      >
        <div className="team-name">Team Gelb</div>
      </section>
      <section
        className="team-card"
        style={{ "--_color": "red" } as React.CSSProperties}
      >
        <div className="team-name">Team Rot</div>
      </section>
    </div>
  );
}
