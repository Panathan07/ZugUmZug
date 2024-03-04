import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cardTask } from "@customTypes/gameTask";
import { useUserContext } from "./useUserContext";

const getTasks = async (api: string, teamId: number | null) => {
  console.log(teamId, "Team");
  const response = await fetch(
    api +
      "?" +
      new URLSearchParams({
        teamId: teamId == null ? "" : teamId.toString(),
      }).toString()
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const userInfo: { pending: cardTask[]; accepted: cardTask[] } =
    (await response.json()) as { pending: cardTask[]; accepted: cardTask[] };
  return userInfo;
};

export const useTasksData = (): {
  pending: cardTask[];
  accepted: cardTask[];
} | null => {
  const user = useUserContext();
  const [tasks, setTasks] = useState<{
    pending: cardTask[];
    accepted: cardTask[];
  } | null>(null);
  const taskResponse = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks("http://localhost:3000/team/tasks", user.teamId),
    staleTime: 10000,
  });

  useEffect(() => {
    if (taskResponse.isLoading) return;
    if (taskResponse.data) {
      setTasks(taskResponse.data);
    }
  }, [taskResponse.data, taskResponse.isLoading]);

  return tasks;
};
