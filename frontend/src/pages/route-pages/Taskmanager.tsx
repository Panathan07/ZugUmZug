import "@assets/css/taskmanager.css";
import { useTasksData } from "@hooks/useTasksData";
import { LoadingPage } from "../state-pages/LoadingPage";
import { PendingTaskCard } from "@components/tasks/taskCard";
import { AcceptedTaskCard } from "@components/tasks/taskCard";
import { cardTask } from "@customTypes/gameTask";
import { useResetTimeData } from "@hooks/useResetTime";
import { useState } from "react";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

export function Taskmanager() {
  const queryClient = useQueryClient();
  const data = useTasksData();
  const resetTime = useResetTimeData();
  const [resetTaskTime, setReset] = useState(
    !(resetTime == null) ? resetTime.task : 0
  );
  if (data == null || resetTime == null) {
    return <LoadingPage />;
  }
  const timer = () => {
    setTimeout(() => {
      setReset(resetTaskTime - 1);
      if (resetTaskTime <= 0) {
        void queryClient.invalidateQueries("goals" as InvalidateQueryFilters);
        void queryClient.invalidateQueries(
          "resetTime" as InvalidateQueryFilters
        );
        setReset(resetTime.task);
      }
    }, 1000);
  };
  timer();

  const pending_task_arr: cardTask[] = data.pending;
  const accepted_task_arr: cardTask[] = data.accepted;
  return (
    <>
      <div className="title-box">
        <p className="title">Aufgaben</p>
        <p className="title">Aufgaben</p>
        <Time time={resetTaskTime} />
      </div>
      <div className="task-box">
        <p style={{ fontSize: "17px", display: "inline" }}>
          Angenommene Aufgaben
        </p>
        <div className="task-grid">
          {accepted_task_arr.map((task_value, index) => (
            <section key={index}>
              <AcceptedTaskCard
                      name={task_value.name}
                      description={task_value.description}
                      data={task_value.data}
                      reward={task_value.reward}
              />
            </section>
          ))}
        </div>
      </div>
      <div className="task-box">
        <p style={{ fontSize: "17px", display: "inline" }}>
          Anzunehmende Aufgaben
        </p>
        <div className="task-grid">
          {pending_task_arr.map((task_value, index) => (
            <PendingTaskCard
              key={index}
              name={task_value.name}
              description={task_value.description}
                  data={task_value.data}
                  reward={task_value.reward}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function Time({ time }: { time: number }) {
  return <p> {time} Sekunden bis zu neuen Aufgaben </p>;
}
