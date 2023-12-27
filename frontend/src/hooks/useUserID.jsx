import { useEffect, useState } from "react";
import { useFetchWithAbort } from "./useFetchWithAbort";
import { useLocalStorage } from "./useLocalStorage";

export const useUserID = (instantiateUserIDAPI) => {
  const [localUserID, setLocalUserID] = useLocalStorage("userID", null);
  const [userIDInTeam, setUserIDInTeam] = useState(null);
  const [userIDResponse, userIDLoading, userIDError] = useFetchWithAbort(
    instantiateUserIDAPI + "?" + new URLSearchParams({ userID: localUserID })
  );

  useEffect(() => {
    if (userIDLoading) return;
    if (userIDResponse == null) return;
    if (userIDResponse.userID) setLocalUserID(userIDResponse.userID);
    if (userIDResponse.inTeam) setUserIDInTeam(userIDResponse.inTeam);
    console.log("userIDResponse.inTeam", userIDResponse.inTeam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIDResponse, userIDLoading, userIDError]);

  return [localUserID, setLocalUserID, userIDInTeam];
};
