import "@assets/css/login.css";
import { useTeamData } from "@hooks/useTeamData";
import { TeamCard } from "@components/login/TeamCard";
import { LoadingPage } from "@pages/state-pages/LoadingPage";
import { ErrorPage } from "@pages/state-pages/ErrorPage";
import { useUserContext } from "@hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
  const [teams, teamsResponse] = useTeamData();
  const user = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.inTeam) navigate("/map");
  }, [navigate, user.inTeam]);

  if (teamsResponse.isLoading) {
    return <LoadingPage />;
  }

  if (teamsResponse.isError || teams == null) {
    return <ErrorPage />;
  }

  return (
    <>
      {/* <h1>Wähle ein Team aus, dem du beitreten möchtest</h1> */}
      <div className="login-grid">
        {teams.map((team) => (
          <TeamCard
            key={teams.indexOf(team)}
            id={teams.indexOf(team)}
            name={team.name}
            color={team.color}
            members={team.members}
          />
        ))}
      </div>
    </>
  );
}
