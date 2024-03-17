import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export enum GameState {
  Started = "Started",
  NotStarted = "NotStarted",
  Ended = "Ended",
}

export const useGame = (): [
  GameState | null,
  UseQueryResult<{ state: GameState }, Error>,
] => {
  const [game, setGame] = useState<GameState | null>(null);
  const gameResponse = useQuery({
    queryKey: ["game"],
    queryFn: () => getGameState("http://localhost:3000/game/state"),
    staleTime: 1000,
  });

  useEffect(() => {
    if (gameResponse.isLoading) return;
    if (gameResponse.data) {
      setGame(gameResponse.data.state);
    }
  }, [gameResponse.data, gameResponse.isLoading]);

  return [game, gameResponse];
};

const getGameState = async (api: string) => {
  const response = await fetch(api);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const gameInfo: { state: GameState } = (await response.json()) as {
    state: GameState;
  };
  return gameInfo;
};
