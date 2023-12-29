import { useUserID } from "./hooks/useUserID";
import { useEffect } from "react";
import { NavigationBar } from "./pages/Navigation";
import { RouterProvider, useNavigate } from "react-router-dom";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userID, setUserID, userIDInTeam, isLoading] = useUserID(
    "http://localhost:3000/userID/instantiate"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!userIDInTeam) {
        navigate("/login");
        return;
      }
      navigate("/map");
    }

    console.log(userID, userIDInTeam);
  }, [userID, userIDInTeam, isLoading]);

  return <NavigationBar />;
}

export default App;
