import { useEffect, useState } from "react";

import jsondata from "@assets/json/roads.json";
import { RoadGroup } from "@customTypes/roadGroup";
import { useTeamData } from "./useTeamData";
import { Team } from "@customTypes/team";
import {
  InvalidateQueryFilters,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { RoadColor } from "@customTypes/roadColor";

function collectRoadData() {
  const roads = [];
  for (const [key, value] of Object.entries(jsondata)) {
    const [startCity, endCity] = key.split(" - ");
    const roadGroup: RoadGroup = {
      startCity: startCity,
      endCity: endCity,
      activated: value.activated === 1 ? true : false,
      color: value.color,
      colorType: value.colorType as RoadColor,
      roads: value.roads,
    };
    roads.push(roadGroup);
  }
  return roads;
}

function alterRoadState(roads: RoadGroup[], teams: Team[]) {
  for (const roadGroup of roads) {
    teamsLoop: for (const team of teams) {
      if (!team.boughtRoads) continue;
      for (const teamRoad of team.boughtRoads) {
        if (
          teamRoad.startCity === roadGroup.startCity &&
          teamRoad.endCity === roadGroup.endCity
        ) {
          roadGroup.activated = true;
          roadGroup.color = team.color;
          break teamsLoop;
        }
        roadGroup.activated = false;
      }
    }
  }
  return roads;
}

function updateRoads(teams: Team[], roads: RoadGroup[]): RoadGroup[] {
  const newRoads = alterRoadState([...roads], teams);

  return newRoads;
}

async function buyRoadFetch({
  teamId,
  roadName,
  colorCard,
}: {
  teamId: number | null;
  roadName: string;
  colorCard: RoadColor;
}) {
  return await fetch("http://localhost:3000/game/buyRoad", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamId: teamId,
      roadName: roadName,
      colorCard: colorCard,
    }),
  });
}

export function useRoads(): [
  RoadGroup[],
  React.Dispatch<React.SetStateAction<RoadGroup[]>>,
  UseMutationResult<
    Response,
    Error,
    {
      teamId: number | null;
      roadName: string;
      colorCard: RoadColor;
    },
    unknown
  >,
] {
  const queryClient = useQueryClient();
  const [roads, setRoads] = useState(collectRoadData());
  const [teams] = useTeamData();
  const buyRoad = useMutation({
    mutationFn: buyRoadFetch,
    onSuccess: async (data) => {
      const state = (await data.json()) as {
        alreadyBought: boolean;
        boughtRoad: boolean;
        enoughCards: boolean;
        exists: boolean;
      };
      let message = "";
      if (!state.exists) message = "Die Straße gibt es nicht.";
      else if (state.alreadyBought) message = "Die Straße wurde schon gekauft.";
      else if (!state.enoughCards)
        message = "Dein Team hat nicht genug Karten von dieser Farbe.";
      else if (state.boughtRoad) message = "Die Straße wurde gekauft.";

      alert(message);
    },
    onError: (err) => {
      alert("An Error occurred. Please try again. -> " + err.message);
    },
    onSettled: () => {
      void queryClient.invalidateQueries("teams" as InvalidateQueryFilters);
    },
  });

  useEffect(() => {
    if (teams == null) return;
    setRoads((prevRoads) => updateRoads(teams, prevRoads));
  }, [teams]);

  return [roads, setRoads, buyRoad];
}
