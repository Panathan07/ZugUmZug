import "@assets/css/taskmanager.css";
import { cardTask } from "@customTypes/gameTask";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useMutation } from "@tanstack/react-query";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

export type acceptedTask = {
  color: string | null;
  task: string;
};
export type solvedTask = {
  color: string | null;
  task: string;
  solution: string;
};
export function PendingTaskCard({ name, description, data }: cardTask) {
  const queryClient = useQueryClient();
  const [localColor] = useLocalStorage<string | null>("team-color", null);
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
        {data.map((value) => (
          <a href={taskDataAccess + value} download>
            {value}
          </a>
        ))}
        <button
          className="task-accept"
          onClick={() => {
            acceptMutation.mutate({
              color: localColor,
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

export function AcceptedTaskCard({ name, description, data }: cardTask) {
  const queryClient = useQueryClient();
  const [localColor] = useLocalStorage<string | null>("team-color", null);
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
  let input_solution: string = "";
  return (
    <>
      <div className="task">
        <p className="title">{name}</p>
        <p>{description}</p>
        {data.map((value) => (
          <a href={taskDataAccess + value} download>
            {value}
          </a>
        ))}
        <div>
          <input
            style={{ color: "blue" }}
            onChange={(event) => (input_solution = event.target.value)}
          ></input>
          <button
            onClick={() =>
              solveMutation.mutate({
                color: localColor,
                task: name,
                solution: input_solution,
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
