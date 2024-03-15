import { streetConnection } from "@customTypes/streetConnection";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "./useUserContext";
async function getGoals(api: string, teamId: number | null) {
  const response = await fetch(
    api +
      "?" +
      new URLSearchParams({
        teamId: teamId != null ? teamId.toString() : "",
      }).toString()
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const userInfo: {
    pending: streetConnection[];
    accepted: streetConnection[];
  } = (await response.json()) as {
    pending: streetConnection[];
    accepted: streetConnection[];
  };

  return userInfo;
}

export const useGoalData = (): {
  pending: streetConnection[];
  accepted: streetConnection[];
} | null => {
  const user = useUserContext();

  const [goals, setGoals] = useState<{
    pending: streetConnection[];
    accepted: streetConnection[];
  } | null>(null);
  const goalResponse = useQuery({
    queryKey: ["goals"],
    queryFn: () => getGoals("http://localhost:3000/team/goals", user.teamId),
  });
  useEffect(() => {
    if (goalResponse.isLoading) return;
    if (goalResponse.data) {
      setGoals(goalResponse.data);
    }
  }, [goalResponse.data, goalResponse.isLoading]);
  return goals;
};
