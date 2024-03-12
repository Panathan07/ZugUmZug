import { streetConnection } from "@customTypes/streetConnection"
import { useGoalData } from "../../hooks/useGoalData"
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "../../hooks/useLocalStorage"
export type acceptedGoal = {
	teamColor: string,
	connection :string[]
}
export function PendingGoals({ connection, reward, distance }: streetConnection) {
	const queryClient = useQueryClient()
	const [localcolor] = useLocalStorage<string | null>(
		"team-color",
		null
	);
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
			<div className="goal">
				<p className="goal-title">Von {connection[0]} zu {connection[1]}</p>
				<br></br>
				<p className="goal-title">Belohnung : {reward} Siegpunkte</p>
				<button className = "button" onClick={() => acceptGoal.mutate({ teamColor: localcolor as string, connection: connection })}>accept Goal</button>
			</div>
		</>
	)
}
async function acceptgoal(acceptedGoal : acceptedGoal){
	return await fetch("http://localhost:3000/team/goals/accept", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(acceptedGoal),
	});
}