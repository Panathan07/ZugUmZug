import { Link, Outlet } from "react-router-dom";
import "@assets/css/navbar.css";
import { NavbarLink } from "@customTypes/navbarLink";
import { useTeamData } from "@hooks/useTeamData";
import { useUserContext } from "@hooks/useUserContext";
import { LoadingPage } from "@pages/state-pages/LoadingPage";

export function NavigationBar() {
  const [teams, teamsResponse] = useTeamData();
  const user = useUserContext();

  const links: NavbarLink[] = [
    { route: "map", description: "Game" },
    { route: "shop", description: "Punkteshop" },
    { route: "taskmanager", description: "Tasks" },
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
        {user.inTeam && !(user.teamId == null) ? (
          <section className="point-section">
            <div className="point-item">
              <div className="main-currency">{teams[user.teamId].points}</div>
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
