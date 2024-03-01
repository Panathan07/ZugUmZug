import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cardTask } from "@customTypes/gameTask";
import { useLocalStorage } from "./useLocalStorage";

const getTasks = async (api: string, color: string | null) => {
  console.log(color, "color");
  const response = await fetch(
    api +
      "?" +
      new URLSearchParams({
        teamColor: color ? color : "",
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
  const [localColor] = useLocalStorage<string | null>("team-color", null);
  const [tasks, setTasks] = useState<{
    pending: cardTask[];
    accepted: cardTask[];
  } | null>(null);
  const taskResponse = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks("http://localhost:3000/team/tasks", localColor),
  });

  useEffect(() => {
    if (taskResponse.isLoading) return;
    if (taskResponse.data) {
      setTasks(taskResponse.data);
    }
  }, [taskResponse.data, taskResponse.isLoading]);

  return tasks;
};
