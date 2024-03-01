import { useUserContext } from "@hooks/useUserContext";
import { RoadTile } from "./RoadTile";
import { useRoads } from "@hooks/useRoads";
import { useTeamData } from "@hooks/useTeamData";
import { Team } from "@customtypes/team";
import { LoadingPage } from "@pages/state-pages/LoadingPage";

export function Roads() {
  function roadOnClick(
    currentState: boolean,
    startCity: string,
    endCity: string,
    teamId: number
  ): void {
    if (currentState) return;
    buyRoad(teamId, startCity, endCity);
    return;
  }

  function buyRoad(teamId: number, startCity: string, endCity: string) {
    buyRoadMutation.mutate({
      teamId: teamId,
      roadName: startCity + " - " + endCity,
    });
  }

  const [roads, , buyRoadMutation] = useRoads();
  const user = useUserContext();
  const [teams] = useTeamData<Team>();

  if (teams == null) return <LoadingPage />;

  let teamId: number = 0;

  for (const team of teams) {
    if (team.members.some((member) => member.ID === user.ID)) break;

    teamId++;
  }

  console.log(teamId, user, roads);

  //TODO: create function that turns roads on or off; modifies their colors to the team color, if turned on

  return (
    <div className="roads-wrapper">
      {roads.map((roadGroup) =>
        roadGroup.roads.map((roadTile) => (
          <RoadTile
            key={
              roadGroup.roads.indexOf(roadTile) + 100 * roads.indexOf(roadGroup)
            }
            color={roadGroup.color}
            rotation={roadTile.rotation}
            posx={roadTile.posx}
            posy={roadTile.posy}
            activated={roadGroup.activated}
            onClick={() =>
              roadOnClick(
                roadGroup.activated,
                roadGroup.startCity,
                roadGroup.endCity,
                teamId
              )
            }
          />
        ))
      )}
    </div>
  );
}
