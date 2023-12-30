import { useUserID } from "./hooks/useUserID";
import { useEffect } from "react";
import { NavigationBar } from "./pages/Navigation";
import { useNavigate } from "react-router-dom";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userID, setUserID, userIDInTeam, userIDResponse] = useUserID(
    "http://localhost:3000/userID/instantiate"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!userIDResponse.isLoading) {
      if (!userIDInTeam) {
        navigate("/login");
        return;
      }
      navigate("/map");
    }

    console.log(userID, userIDInTeam);
  }, [userID, userIDInTeam, userIDResponse.isLoading, navigate]);

  return <NavigationBar />;
}

export default App;
