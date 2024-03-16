import "@assets/css/taskmanager.css";
import { cardTask } from "@customTypes/gameTask";
import { useUserContext } from "@hooks/useUserContext";
import { useMutation } from "@tanstack/react-query";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export type acceptedTask = {
  teamId: number | null;
  task: string;
};
export type solvedTask = {
  teamId: number | null;
  task: string;
  solution: string;
};
export function PendingTaskCard({ name, description, data, reward }: cardTask) {
  const queryClient = useQueryClient();
  const user = useUserContext();
  const acceptMutation = useMutation<Response, Error, acceptedTask>({
    mutationFn: acceptTask,
    onError: () => {
      alert("An Error occurred. Please try again");
    },
    onSettled: () => {
      void queryClient.invalidateQueries("tasks" as InvalidateQueryFilters);
    },
  });

  const taskDataAccess: string = "/task-file/";
  return (
    <>
      <div className="task">
        <p className="title">{name}</p>
              <p>{description}</p>
              <p>Belohnung : {reward}</p>
        {data.map((value, index) => (
          <a key={index} href={taskDataAccess + value} download>
            {value}
          </a>
        ))}
        <button
          className="task-accept"
          onClick={() => {
            acceptMutation.mutate({
              teamId: user.teamId,
              task: name,
            } as acceptedTask);
          }}
        >
          accept
        </button>
      </div>
    </>
  );
}

export function AcceptedTaskCard({ name, description, data,reward }: cardTask) {
  const queryClient = useQueryClient();
  const user = useUserContext();
  const solveMutation = useMutation<Response, Error, solvedTask>({
    mutationFn: solveTask,
    onError: () => {
      alert("An Error occured. Please try again");
    },
    onSettled: () => {
      void queryClient.invalidateQueries("tasks" as InvalidateQueryFilters);
    },
  });
  const taskDataAccess: string = "/task-file/";
  const [solutionInput, setSolutionInput] = useState("");
  return (
    <>
      <div className="task">
        <p className="title">{name}</p>
              <p>{description}</p>
              <p>Belohnung : {reward}</p>
        {data.map((value) => (
          <a href={taskDataAccess + value} download>
            {value}
          </a>
        ))}
        <div>
          <input
            style={{ color: "blue" }}
            onChange={(event) => {
              setSolutionInput(event.target.value);
              console.log(solutionInput);
            }}
          ></input>
          <button
            onClick={() =>
              solveMutation.mutate({
                teamId: user.teamId,
                task: name,
                solution: solutionInput,
              } as solvedTask)
            }
          >
            solve
          </button>
        </div>
      </div>
    </>
  );
}

async function solveTask(solution: solvedTask) {
  console.log(solution.solution);
  return await fetch("http://localhost:3000/tasks/solve", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(solution),
  });
}
async function acceptTask(taskData: acceptedTask) {
  return await fetch("http://localhost:3000/tasks/accept", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
}
