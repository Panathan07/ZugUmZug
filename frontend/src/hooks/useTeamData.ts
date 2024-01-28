import { useEffect, useState } from "react";
import {
  InvalidateQueryFilters,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

export const useTeamData = <T>(): [
  T[] | null,
  UseQueryResult<{ teams: T[] }, Error>,
] => {
  const [teams, setTeams] = useState<T[] | null>(null);
  const queryClient = useQueryClient();
  const teamsResponse = useQuery({
    queryKey: ["teams"],
    queryFn: () => getTeams<T>("http://localhost:3000/teams"),
  });

  useEffect(() => {
    if (teamsResponse.isLoading) return;
    if (teamsResponse.data) {
      setTeams(teamsResponse.data.teams);
      void queryClient.invalidateQueries("user" as InvalidateQueryFilters);
    }
  }, [queryClient, teamsResponse.data, teamsResponse.isLoading]);

  return [teams, teamsResponse];
};

const getTeams = async <T>(api: string) => {
  const response = await fetch(api);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const teamsInfo: { teams: T[] } = (await response.json()) as { teams: T[] };
  return teamsInfo;
};
