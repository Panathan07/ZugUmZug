import { streetConnection } from "@customTypes/streetConnection"
import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
async function getGoals(api: string, color: string | null) {
    const response = await fetch(
        api + "?" + new URLSearchParams({
            teamColor: color != null ? color : ""
        }).toString())
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const userInfo: { pending: streetConnection[]; accepted: streetConnection[] } =
        (await response.json()) as { pending: streetConnection[]; accepted: streetConnection[] };
    
    return userInfo;
}

export const useGoalData = (): {
    pending: streetConnection[]
    accepted: streetConnection[]
} | null => {
    const [localColor] = useLocalStorage<string | null>("team-color", null);

    const [goals, setGoals] = useState<{
        pending: streetConnection[]
        accepted: streetConnection[]
    } | null>(null)
    const goalResponse = useQuery({
        queryKey: ["goals"],
        queryFn: () => getGoals("http://localhost:3000/team/goals", localColor)
    })
    useEffect(() => {
        if (goalResponse.isLoading) return;
        if (goalResponse.data) {
            setGoals(goalResponse.data)
        }
    }, [goalResponse.data, goalResponse.isLoading])
    return goals
}