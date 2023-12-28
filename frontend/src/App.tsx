import { useUserID } from "./hooks/useUserID";
import { useEffect } from "react";
import { NavigationBar } from "./pages/Navigation";

function App() {
  const [userID, setUserID, userIDInTeam] = useUserID(
    "http://localhost:3000/userID/instantiate"
  );
  useEffect(() => {
    console.log(userID, userIDInTeam);
  }, [userID, userIDInTeam]);

  return (
    <>
      <NavigationBar />
    </>
  );
}

export default App;
