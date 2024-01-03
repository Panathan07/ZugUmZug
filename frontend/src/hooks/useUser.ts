import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { User } from "@customtypes/user";

const getUserInfo = async (user: User | null, api: string) => {
  const response = await fetch(
    api +
      "?" +
      new URLSearchParams({
        userID: user?.userID ? user?.userID : "_",
      }).toString()
  ); // if userID != null -> pass it - else pass an invalid ID
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const userInfo = (await response.json()) as User;
  return userInfo;
};

export const useUser = (
  instantiateUserIDAPI: string
): [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>,
  UseQueryResult<User, Error>,
] => {
  const [localUser, setLocalUser] = useLocalStorage<User | null>("user", null);
  const UserIDResult = useQuery({
    queryKey: ["userID"],
    queryFn: () => getUserInfo(localUser, instantiateUserIDAPI),
  });

  useEffect(() => {
    if (UserIDResult.isLoading) return;
    if (UserIDResult.isError) return;
    if (!UserIDResult.isFetched) return;
    if (!UserIDResult.data) return;
    setLocalUser({
      username: UserIDResult.data.username,
      userID: UserIDResult.data.userID,
      existed: UserIDResult.data.existed,
      inTeam: UserIDResult.data.inTeam,
    });
    console.log("userIDResponse.inTeam", UserIDResult.data.inTeam);
  }, [
    UserIDResult.data,
    UserIDResult.isFetched,
    UserIDResult.isLoading,
    UserIDResult.isError,
    setLocalUser,
  ]);

  return [localUser, setLocalUser, UserIDResult];
};
