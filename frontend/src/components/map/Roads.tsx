import { useUserContext } from "@hooks/useUserContext";
import { RoadTile } from "./RoadTile";
import { useRoads } from "@hooks/useRoads";
import { useTeamData } from "@hooks/useTeamData";
import { LoadingPage } from "@pages/state-pages/LoadingPage";
import { BuyRoadPopUp } from "./BuyRoadPopUp";
import { useCallback, useState } from "react";

export function Roads() {
  function roadOnClick(
    currentState: boolean,
    startCity: string,
    endCity: string
  ): void {
    if (currentState) return;
    setIsPopUpActivated(true);
    setCityConnection({ startCity: startCity, endCity: endCity });
    return;
  }

  const [roads, , buyRoadMutation] = useRoads();
  const user = useUserContext();
  const [teams] = useTeamData();
  const [isPopUpActivated, setIsPopUpActivated] = useState(false);
  const [cityConnection, setCityConnection] = useState({
    startCity: "",
    endCity: "",
  });
  const submitBuyRoad = useCallback(
    (startCity: string, endCity: string) => {
      return buyRoadMutation.mutate({
        teamId: user.teamId,
        roadName: startCity + " - " + endCity,
      });
    },
    [user.teamId, buyRoadMutation]
  );

  if (teams == null) return <LoadingPage />;

  return (
    <>
      <div className="roads-wrapper">
        {roads.map((roadGroup) =>
          roadGroup.roads.map((roadTile) => (
            <RoadTile
              key={
                roadGroup.roads.indexOf(roadTile) +
                100 * roads.indexOf(roadGroup)
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
                  roadGroup.endCity
                )
              }
            />
          ))
        )}
      </div>
      <BuyRoadPopUp
        active={isPopUpActivated}
        cityConnection={cityConnection}
        submitBuyRoad={submitBuyRoad}
        setIsPopUpActivated={setIsPopUpActivated}
      />
    </>
  );
}
