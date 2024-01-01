import "../assets/css/login.css";
import { useTeamData } from "../hooks/useTeamData";
import { TeamCard } from "../components/login/TeamCard";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";

declare global {
  type Team = {
    name: string;
    color: string;
    points: number;
    members: User[];
    tasks: string[]; //TODO: needs to be specified when tasks are done in backend
    roads: {
      [key: string]: number;
    };
  };

  type User = {
    name: string;
    userID: string;
  };
}

export function Login() {
  const [teams, teamsResponse] = useTeamData<Team>(
    "http://localhost:3000/teams"
  );

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
            name={team.name}
            color={team.color}
            members={team.members}
          />
        ))}
      </div>
    </>
  );
}
