import { useGoalData } from "../../hooks/useGoalData";
import { LoadingPage } from "../state-pages/LoadingPage";
import "../../assets/css/goals.css";
import { PendingGoals } from "../../components/goals/PendingGoalCard";
import { AcceptedGoal } from "../../components/goals/AcceptedGoalCard";
import { useResetTimeData } from "../../hooks/useResetTime";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function Goals() {
  const queryclient = useQueryClient();
  const data = useGoalData();
  const resetTime = useResetTimeData();
  const [resetGoalTime, setReset] = useState(
    !(resetTime == null) ? resetTime.goal : 0
  );
  if (data == null || resetTime == null) {
    return <LoadingPage />;
  }
  const timer = () => {
    setTimeout(() => {
      setReset(resetGoalTime - 1);
      if (resetGoalTime <= 0) {
        void queryclient.invalidateQueries("goals" as InvalidateQueryFilters);
        void queryclient.invalidateQueries(
          "resetTime" as InvalidateQueryFilters
        );
        setReset(resetTime.goal); // needs too wait for new reset time (Doesnt)
      }
    }, 100);
  };
  timer();
  const pending_goals = data.pending;
  const accepted_goals = data.accepted;
  return (
    <>
      <div className="title-box">
        <p className="title">Goals</p>
        <Time time={resetGoalTime} />
      </div>
      <div className="goal-box">
        <p className="goal-title">accepted</p>
        <div className="goal-grid">
          {accepted_goals.map((value) => (
            <AcceptedGoal
              connection={value.connection}
              distance={value.distance}
              reward={value.reward}
            />
          ))}
        </div>
      </div>
      <div className="goal-box">
        <p className="goal-title">pending</p>
        <div className="goal-grid">
          {pending_goals.map((value) => (
            <PendingGoals
              connection={value.connection}
              distance={value.distance}
              reward={value.reward}
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
