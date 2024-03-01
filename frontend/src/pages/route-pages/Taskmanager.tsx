import "@assets/css/taskmanager.css";
export function Taskmanager() {
  return (
    <>
      <div className="title-box">
        <p className="title">Aufgaben</p>
      </div>
      <div className="task-box">
        <p style={{ fontSize: "17px", display: "inline" }}>
          Angenommene Aufgaben
        </p>
      </div>
      <div className="task-box">
        <p style={{ fontSize: "17px", display: "inline" }}>
          Anzunehmende Aufgaben
        </p>
      </div>
    </>
  );
}
