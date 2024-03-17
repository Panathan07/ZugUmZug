import { Link, Outlet } from "react-router-dom";
import "@assets/css/navbar.css";
import { NavbarLink } from "@customTypes/navbarLink";
import { useTeamData } from "@hooks/useTeamData";
import { useUserContext } from "@hooks/useUserContext";
import { LoadingPage } from "@pages/state-pages/LoadingPage";
import ColorCardsDisplay from "@components/map/ColorCardsDisplay";

export function NavigationBar() {
  const [teams, teamsResponse] = useTeamData();
  const user = useUserContext();

  const links: NavbarLink[] = [
    { route: "map", description: "Karte" },
    { route: "shop", description: "Punkteshop" },
    { route: "taskmanager", description: "Aufgaben" },
    { route: "goals", description: "Ziele" },
  ];

  if (teams == null || teamsResponse.isLoading) return <LoadingPage />;

  return (
    <>
      <nav className="navbar">
        <section className="link-wrapper">
          {links.map((link) => (
            <div className="route" key={links.indexOf(link)}>
              <Link to={link.route}>{link.description}</Link>
            </div>
          ))}
        </section>
        <section className="colorCards-display">
          {user.inTeam && !(user.teamId == null) ? <ColorCardsDisplay /> : null}
        </section>
        {user.inTeam && !(user.teamId == null) ? (
          <section className="point-section">
            <div className="point-item">
              <div className="win-points">
                {teams[user.teamId].winPoints} Siegpunkte
              </div>
            </div>
            <div className="point-item">
              <div className="main-currency">{teams[user.teamId].points} P</div>
            </div>
          </section>
        ) : null}
      </nav>
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
}
