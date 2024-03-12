import { streetConnection } from "@customTypes/streetConnection"
import { useGoalData } from "../../hooks/useGoalData"
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocalStorage } from "../../hooks/useLocalStorage"
export type checkedGoals = {
	teamColor: string,
	connection: string[]
}
export function AcceptedGoal({ connection, reward, distance }: streetConnection) {
	const queryClient = useQueryClient()
	const [localcolor] = useLocalStorage<string | null>(
		"team-color",
		null
	);
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
			<div className="goal">
				<p className="goal-title">Von {connection[0]} zu {connection[1]}</p>
				<br></br>
				<p className="goal-title">Belohnung : {reward} Siegpunkte</p>
				<button className="button" onClick={() => checkGoal.mutate({ teamColor: localcolor as string, connection: connection })}>Lösen</button>
			</div>
		</>
	)
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