import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { resetTime } from "../custom-types/time";

const getTime = async (api: string) => {
    const response = await fetch(api)
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const time: resetTime  =
        (await response.json()) as resetTime;
    return time;
};

export const useResetTimeData = (): resetTime | null => {
    const [resetTime, setResetTime] = useState<resetTime | null>(null);
    const resetTimeResponse = useQuery({
        queryKey: ["resetTime"],
        queryFn: () => getTime("http://localhost:3000/team/time"),
    });

    useEffect(() => {
        if (resetTimeResponse.isLoading) return;
        if (resetTimeResponse.data) {
            setResetTime(resetTimeResponse.data);
        }
    }, [resetTimeResponse.data, resetTimeResponse.isLoading]);

    return resetTime;
};
