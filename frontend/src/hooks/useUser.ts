import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { User } from "@customTypes/user";

const getUserInfo = async (user: User | null, api: string) => {
  const response = await fetch(
    api +
      "?" +
      new URLSearchParams({
        userID: user?.ID ? user?.ID : "-",
      }).toString()
  ); // if userID != null -> pass it - else pass an invalid ID
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const userInfo = (await response.json()) as User;
  return userInfo;
};

export const useUser = (
  instantiateUserAPI: string
): [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>,
  UseQueryResult<User, Error>,
] => {
  const [localUser, setLocalUser] = useLocalStorage<User | null>("user", null);
  const UserResult = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(localUser, instantiateUserAPI),
  });

  useEffect(() => {
    if (UserResult.isLoading) return;
    if (UserResult.isError) return;
    if (!UserResult.isFetched) return;
    if (!UserResult.data) return;
    setLocalUser({
      name: UserResult.data.name,
      ID: UserResult.data.ID,
      inTeam: UserResult.data.inTeam,
      teamId: UserResult.data.teamId,
    });
  }, [
    UserResult.data,
    UserResult.isFetched,
    UserResult.isLoading,
    UserResult.isError,
    setLocalUser,
  ]);

  return [localUser, setLocalUser, UserResult];
};