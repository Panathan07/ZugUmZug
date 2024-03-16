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

  const pendingTasks: cardTask[] = data.pending;
  const acceptedTasks: cardTask[] = data.accepted;
  return (
    <>
      <div className="task-header">
        <div className="header">Aufgaben</div>
        <Time time={resetTaskTime} />
      </div>
      <div className="cards-section accepted-task">
        <div className="heading">Angenommene Aufgaben</div>
        <div className="card-grid">
          {acceptedTasks.map((task, index) => (
            <section key={index}>
              <AcceptedTaskCard
                name={task.name}
                description={task.description}
                data={task.data}
                reward={task.reward}
              />
            </section>
          ))}
        </div>
      </div>
      <div className="cards-section pending-task">
        <div className="heading">Verfügbare Aufgaben</div>
        <div className="card-grid">
          {pendingTasks.map((task, index) => (
            <PendingTaskCard
              key={index}
              name={task.name}
              description={task.description}
              data={task.data}
              reward={task.reward}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function Time({ time }: { time: number }) {
  return <p className="timer"> {time} Sekunden bis zu neuen Aufgaben </p>;
}
