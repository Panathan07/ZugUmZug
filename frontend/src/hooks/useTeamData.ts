import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useTeamData = <T>(
  teamsApi: string
): [T[] | null, UseQueryResult<{ teams: T[] }, Error>] => {
  const [teams, setTeams] = useState<T[] | null>(null);
  const teamsResponse = useQuery({
    queryKey: ["teams"],
    queryFn: () => getTeams<T>(teamsApi),
  });

  useEffect(() => {
    if (teamsResponse.isLoading) return;
    if (teamsResponse.data) {
      setTeams(teamsResponse.data.teams);
    }
  }, [teamsResponse.data, teamsResponse.isLoading]);

  return [teams, teamsResponse];
};

const getTeams = async <T>(api: string) => {
  const response = await fetch(api);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const userInfo: { teams: T[] } = (await response.json()) as { teams: T[] };
  return userInfo;
};
