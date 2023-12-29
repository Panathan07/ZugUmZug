import { useUserID } from "./hooks/useUserID";
import { useEffect } from "react";
import { NavigationBar } from "./pages/Navigation";
import { useNavigate } from "@tanstack/react-router";
import { LoadingPage } from "./pages/LoadingPage";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userID, setUserID, userIDInTeam, isLoading] = useUserID(
    "http://localhost:3000/userID/instantiate"
  );

  const navigate = useNavigate({ from: "/" });

  useEffect(() => {
    if (!isLoading) {
      if (!userIDInTeam) {
        navigate({ to: "/login" });
        return;
      }
      navigate({ to: "/map" });
    }

    console.log(userID, userIDInTeam);
  }, [userID, userIDInTeam, isLoading, navigate]);

  if (isLoading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }

  return (
    <>
      <NavigationBar />
    </>
  );
}

export default App;
