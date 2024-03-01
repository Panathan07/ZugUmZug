import { RoadColor } from "@customTypes/roadColor";
import { useEffect, useRef, useState } from "react";
import roadsData from "@assets/json/roads.json";

export function BuyRoadPopUp({
  active,
  cityConnection,
  submitBuyRoad,
  setIsPopUpActivated,
}: {
  active: boolean;
  cityConnection: { startCity: string; endCity: string };
  submitBuyRoad: (
    startCity: string,
    endCity: string,
    colorCard: RoadColor
  ) => void;
  setIsPopUpActivated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const popUpRef = useRef<HTMLDialogElement>(null);
  const [color, setColor] = useState<RoadColor>("none");

  useEffect(() => {
    if (popUpRef == null || popUpRef.current == null) return;
    const dialogElement = popUpRef.current;
    if (active) {
      dialogElement.showModal();
    }
    if (!active) {
      dialogElement.close();
    }
  }, [popUpRef, active]);

  useEffect(() => {
    const road = getRoad(cityConnection.startCity, cityConnection.endCity);
    if (road == null) return;
    setColor(road.colorType as RoadColor);
  }, [cityConnection.startCity, cityConnection.endCity]);

  function submitOnClick() {
    submitBuyRoad(cityConnection.startCity, cityConnection.endCity, color);
    setTimeout(() => setIsPopUpActivated(false));
  }

  return (
    <dialog ref={popUpRef} style={{ background: "black" }}>
      <p>
        Du kaufst die Straße von {cityConnection.startCity} nach{" "}
        {cityConnection.endCity}.
      </p>
      <p>Diese kostet {} Punkt/e</p>
      {color !== "none" ? <></> : <CardChoiceField />}
      <p>Möchtest du trotzdem fortfahren?</p>
      <button onClick={submitOnClick}>Kauf fortfahren</button>
      <button onClick={() => setIsPopUpActivated(false)}>Schließen</button>
    </dialog>
  );
}

function CardChoiceField() {
  return (
    <>
      <p>Welche Kartenart möchtest du verwenden</p>
    </>
  );
}

function getRoad(startCity: string, endCity: string) {
  const citiesString = startCity + " - " + endCity;
  for (const [cities, props] of Object.entries(roadsData)) {
    if (citiesString === cities) {
      return props;
    }
  }
  return null;
}
