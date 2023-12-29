import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useTeamData = (teamsApi: string) => {
  const [teams, setTeams] = useState<object | null>(null);
  const teamsResponse = useQuery({
    queryKey: ["teams"],
    queryFn: () => getTeams(teamsApi),
  });

  useEffect(() => {
    if (teamsResponse.isLoading) return;
    if (teamsResponse.data) {
      setTeams(teamsResponse.data.teams);
    }
  }, [teamsResponse.data, teamsResponse.isLoading]);

  return teams;
};

const getTeams = async (api: string) => {
  const response = await fetch(api);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const userInfo = await response.json();
  return userInfo;
};
