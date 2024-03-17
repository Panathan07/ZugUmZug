import { useUser } from "@hooks/useUser";
import { useEffect } from "react";
import { NavigationBar } from "@pages/route-pages/Navigation";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingPage } from "@pages/state-pages/LoadingPage";
import { UserContext } from "@hooks/useUserContext";
import { GameState, useGame } from "@hooks/useGame";
import { Team } from "@customTypes/team";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, , userResponse] = useUser(
    "http://localhost:3000/user/instantiate"
  );

  const [game] = useGame();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname) return;
    if (userResponse.isLoading) return;
    if (user == null) return;
    console.log(user);
    if (!user.inTeam) {
      navigate("/login");
      return;
    }
  }, [user, userResponse.isLoading, navigate, location.pathname]);

  useEffect(() => {
    async function getResults() {
      const response = await fetch("http://localhost:3000/game/results");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = (await response.json()) as { team: Team | null };
      return result;
    }
    if (game == null) return;
    if (game == GameState.Ended) {
      void getResults().then((result) => {
        if (result.team == null) return;
        alert(
          "Das Team " +
            result.team.color +
            " hat mit " +
            result.team.winPoints +
            " Punkten gewonnen."
        );
      });
    }
  }, [game]);

  if (user == null || userResponse.isLoading || game == null) {
    return <LoadingPage />;
  }

  return (
    <UserContext.Provider value={user}>
      <NavigationBar />
    </UserContext.Provider>
  );
}

export default App;
