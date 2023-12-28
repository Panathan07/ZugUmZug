import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useQuery } from "@tanstack/react-query";

type UserIDData = {
  userID: string;
  existed: boolean;
  inTeam: boolean;
};

const getUserInfo = async (userID: string | null, api: string) => {
  const response = await fetch(
    api + "?" + new URLSearchParams({ userID: userID ? userID : "_" })
  ); // if userID != null -> pass it - else pass an invalid ID
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const userInfo: UserIDData = await response.json();
  return userInfo;
};

export const useUserID = (
  instantiateUserIDAPI: string
): [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>,
  boolean | null
] => {
  const [localUserID, setLocalUserID] = useLocalStorage<string>("userID", null);
  const [userIDInTeam, setUserIDInTeam] = useState<boolean | null>(null);
  const UserIDResult = useQuery({
    queryKey: ["userID"],
    queryFn: () => getUserInfo(localUserID, instantiateUserIDAPI),
  });

  useEffect(() => {
    if (UserIDResult.isLoading) return;
    if (UserIDResult.isError) return;
    if (!UserIDResult.isFetched) return;
    if (!UserIDResult.data) return;
    setLocalUserID(UserIDResult.data.userID);
    setUserIDInTeam(UserIDResult.data.inTeam);
    console.log("userIDResponse.inTeam", UserIDResult.data.inTeam);
  }, [
    UserIDResult.data,
    UserIDResult.isFetched,
    UserIDResult.isLoading,
    UserIDResult.isError,
    setLocalUserID,
  ]);

  return [localUserID, setLocalUserID, userIDInTeam];
};
