import "../assets/css/login.css";
export function Login() {
  return (
    <div className="login-grid">
      <button className="item-1 button" style={{ backgroundColor: "blue" }}>
        select <br></br> Team blue
      </button>
      <button className="item-2 button" style={{ backgroundColor: "green" }}>
        select <br></br> Team green
      </button>
      <button className="item-3 button" style={{ backgroundColor: "yellow" }}>
        select <br></br> Team yellow
      </button>
      <button className="item-4 button" style={{ backgroundColor: "red" }}>
        select <br></br> Team Red
      </button>
    </div>
  );
}
