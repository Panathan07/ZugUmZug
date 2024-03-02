import { RoadColor } from "@customTypes/roadColor";
import { useEffect, useRef, useState } from "react";
import roadsData from "@assets/json/roads.json";
import "@assets/css/roadPopUp.css";

import ColorCardsDisplay from "./ColorCardsDisplay";

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
  const [selectedColor, setSelectedColor] = useState<RoadColor>("none");

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
    if (color === "none") {
      submitBuyRoad(
        cityConnection.startCity,
        cityConnection.endCity,
        selectedColor
      );
    } else {
      submitBuyRoad(cityConnection.startCity, cityConnection.endCity, color);
    }

    setTimeout(() => setIsPopUpActivated(false));
  }

  console.log(selectedColor, color);

  return (
    <dialog ref={popUpRef} className="pop-up">
      <p>
        Du kaufst die Straße von {cityConnection.startCity} nach{" "}
        {cityConnection.endCity}.
      </p>
      <p>Diese kostet {} Punkt/e</p>
      {color !== "none" ? (
        <></>
      ) : (
        <CardChoiceField
          selectedColor={selectedColor}
          selectColor={setSelectedColor}
        />
      )}
      <div className="button-wrapper">
        {color === "none" && selectedColor === "none" ? (
          <></>
        ) : (
          <button onClick={submitOnClick}>Bestätigen</button>
        )}
        <button onClick={() => setIsPopUpActivated(false)}>Schließen</button>
      </div>
    </dialog>
  );
}

function CardChoiceField({
  selectedColor,
  selectColor,
}: {
  selectedColor: RoadColor;
  selectColor: React.Dispatch<React.SetStateAction<RoadColor>>;
}) {
  return (
    <>
      <p>Welche Kartenart möchtest du verwenden?</p>
      <ColorCardsDisplay
        style={{ marginBlock: "1rem", height: "4rem", width: "100%" }}
        selectedColor={selectedColor}
        onClick={selectColor}
      />
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
