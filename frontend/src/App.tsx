import { useUser } from "@hooks/useUser";
import { useEffect } from "react";
import { NavigationBar } from "@pages/route-pages/Navigation";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "@pages/state-pages/LoadingPage";
import { UserContext } from "@hooks/useUserContext";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUserID, userIDResponse] = useUser(
    "http://localhost:3000/user/instantiate"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!userIDResponse.isLoading) {
      if (!user?.inTeam) {
        navigate("/login");
        return;
      }
    }

    console.log(user, user?.inTeam);
  }, [user, userIDResponse.isLoading, navigate]);

  if (user == null || userIDResponse.isLoading) {
    return <LoadingPage />;
  }

  return (
    <UserContext.Provider value={user}>
      <NavigationBar />
    </UserContext.Provider>
  );
}

export default App;
