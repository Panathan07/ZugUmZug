import { useUserID } from "./hooks/useUserID";
import { useEffect } from "react";
import { NavigationBar } from "./pages/Navigation";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
