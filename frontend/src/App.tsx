import { useUser } from "@hooks/useUser";
import { useEffect } from "react";
import { NavigationBar } from "@pages/route-pages/Navigation";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingPage } from "@pages/state-pages/LoadingPage";
import { UserContext } from "@hooks/useUserContext";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, , userResponse] = useUser(
    "http://localhost:3000/user/instantiate"
  );

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

  if (user == null || userResponse.isLoading) {
    return <LoadingPage />;
  }

  return (
    <UserContext.Provider value={user}>
      <NavigationBar />
    </UserContext.Provider>
  );
}

export default App;
