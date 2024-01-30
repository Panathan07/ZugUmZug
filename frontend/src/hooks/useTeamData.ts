import { useEffect, useState } from "react";
import {
  InvalidateQueryFilters,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Team } from "@customTypes/team";

export const useTeamData = (): [
  Team[] | null,
  UseQueryResult<{ teams: Team[] }, Error>,
] => {
  const [teams, setTeams] = useState<Team[] | null>(null);
  const queryClient = useQueryClient();
  const teamsResponse = useQuery({
    queryKey: ["teams"],
    queryFn: () => getTeams("http://localhost:3000/teams"),
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

const getTeams = async (api: string) => {
  const response = await fetch(api);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const teamsInfo: { teams: Team[] } = (await response.json()) as {
    teams: Team[];
  };
  return teamsInfo;
};
