import { streetConnection } from "@customTypes/streetConnection";
// import { useGoalData } from "../../hooks/useGoalData";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useUserContext } from "@hooks/useUserContext";
export type checkedGoals = {
  teamId: number | null;
  connection: string[];
};
export function AcceptedGoal({
  connection,
  reward,
  //   distance,
}: streetConnection) {
  const queryClient = useQueryClient();
  const user = useUserContext();
  const checkGoal = useMutation<Response, Error, checkedGoals>({
    mutationFn: checkGoals,
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
            checkGoal.mutate({
              teamId: user.teamId,
              connection: connection,
            })
          }
        >
          Lösen
        </button>
      </div>
    </>
  );
}

async function checkGoals(checkedGoal: checkedGoals) {
  return await fetch("http://localhost:3000/team/goals/check", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checkedGoal),
  });
}
