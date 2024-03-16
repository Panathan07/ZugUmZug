import { streetConnection } from "@customTypes/streetConnection";
// import { useGoalData } from "@hooks/useGoalData";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useUserContext } from "@hooks/useUserContext";
export type acceptedGoal = {
  teamId: number | null;
  connection: string[];
};
export function PendingGoals({
  connection,
  reward,
  //   distance,
}: streetConnection) {
  const queryClient = useQueryClient();
  const user = useUserContext();
  const acceptGoal = useMutation<Response, Error, acceptedGoal>({
    mutationFn: acceptgoal,
    onError: () => {
      alert("An Error occurred. Please try again");
    },
    onSettled: () => {
      void queryClient.invalidateQueries("goals" as InvalidateQueryFilters);
    },
  });
  return (
    <>
      <div className="card">
        <p className="title">
          Von {connection[0]} zu {connection[1]}
        </p>
        <p className="reward">Belohnung : {reward} Siegpunkte</p>
        <button
          className="card-button"
          onClick={() =>
            acceptGoal.mutate({
              teamId: user.teamId,
              connection: connection,
            })
          }
        >
          Annehmen
        </button>
      </div>
    </>
  );
}
async function acceptgoal(acceptedGoal: acceptedGoal) {
  return await fetch("http://localhost:3000/team/goals/accept", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(acceptedGoal),
  });
}
