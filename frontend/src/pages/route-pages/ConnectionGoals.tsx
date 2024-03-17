import { useGoalData } from "../../hooks/useGoalData";
import { LoadingPage } from "../state-pages/LoadingPage";
import "../../assets/css/goals.css";
import { PendingGoals } from "../../components/goals/PendingGoalCard";
import { AcceptedGoal } from "../../components/goals/AcceptedGoalCard";
import { useResetTimeData } from "../../hooks/useResetTime";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { useUserContext } from "@hooks/useUserContext";

export function Goals() {
  const queryClient = useQueryClient();
  const data = useGoalData();
  const resetTime = useResetTimeData();
  const user = useUserContext();
  const [resetGoalTime, setReset] = useState(
    !(resetTime == null) ? resetTime.goal : 0
  );
  const rotateGoals = useMutation({
    mutationFn: async () => {
      return await fetch("http://localhost:3000/team/goals/rotate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamId: user.teamId,
        }),
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries("teams" as InvalidateQueryFilters);
    },
  });
  if (data == null || resetTime == null) {
    return <LoadingPage />;
  }

  const timer = () => {
    setTimeout(() => {
      setReset(resetGoalTime - 1);
      if (resetGoalTime <= 0) {
        void queryClient.invalidateQueries("goals" as InvalidateQueryFilters);
        void queryClient.invalidateQueries(
          "resetTime" as InvalidateQueryFilters
        );
        setReset(resetTime.goal); // needs too wait for new reset time (Doesnt)
      }
    }, 1000);
  };
  timer();
  const pending_goals = data.pending;
  const accepted_goals = data.accepted;
  return (
    <>
      <div className="goal-header">
        <div className="header">Ziele</div>
        <Time time={resetGoalTime} />
      </div>
      <button className="shuffle" onClick={() => rotateGoals.mutate()}>
        Neu mischen
      </button>
      <div className="cards-section accepted-goals">
        <div className="heading">Angenommen</div>
        <div className="card-grid">
          {accepted_goals.map((value, index) => (
            <AcceptedGoal
              key={index}
              connection={value.connection}
              distance={value.distance}
              reward={value.reward}
            />
          ))}
        </div>
      </div>
      <div className="cards-section pending-goals">
        <div className="heading">Verfügbar</div>
        <div className="card-grid">
          {pending_goals.map((value, index) => (
            <PendingGoals
              key={index}
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
  return <p className="timer"> {time} Sekunden bis zu neuen Aufgaben </p>;
}
