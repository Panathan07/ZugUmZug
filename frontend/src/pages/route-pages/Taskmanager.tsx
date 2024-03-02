import "@assets/css/taskmanager.css";
import { useTasksData } from "@hooks/useTasksData";
import { LoadingPage } from "../state-pages/LoadingPage";
import { PendingTaskCard } from "@components/tasks/taskCard";
import { AcceptedTaskCard } from "@components/tasks/taskCard";
import { cardTask } from "@customTypes/gameTask";

export function Taskmanager() {
  const data = useTasksData();
  if (data == null) {
    return <LoadingPage />;
  }

  const pending_task_arr: cardTask[] = [];
  for (const value of Object.values(data.pending)) {
    pending_task_arr.push(value);
  }
  const accepted_task_arr: cardTask[] = [];
  for (const value of Object.values(data.accepted)) {
    accepted_task_arr.push(value);
  }
  return (
    <>
      <div className="title-box">
        <p className="title">Aufgaben</p>
      </div>
      <div className="task-box">
        <p style={{ fontSize: "17px", display: "inline" }}>
          Angenommene Aufgaben
        </p>
        <div className="task-grid">
          {accepted_task_arr.map((task_value) => (
            <section>
              <AcceptedTaskCard
                name={task_value.name}
                description={task_value.description}
                data={task_value.data}
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
          {pending_task_arr.map((task_value) => (
            <PendingTaskCard
              name={task_value.name}
              description={task_value.description}
              data={task_value.data}
            />
          ))}
        </div>
      </div>
    </>
  );
}
