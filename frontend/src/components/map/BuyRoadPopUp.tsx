import { useEffect, useRef } from "react";

export function BuyRoadPopUp({
  active,
  cityConnection,
  submitBuyRoad,
  setIsPopUpActivated,
}: {
  active: boolean;
  cityConnection: { startCity: string; endCity: string };
  submitBuyRoad: (startCity: string, endCity: string) => void;
  setIsPopUpActivated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const popUpRef = useRef<HTMLDialogElement>(null);

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

  function submitOnClick() {
    submitBuyRoad(cityConnection.startCity, cityConnection.endCity);
    setTimeout(() => setIsPopUpActivated(false));
  }

  return (
    <dialog ref={popUpRef} style={{ background: "black" }}>
      <p>
        Du kaufst die Straße von {cityConnection.startCity} nach{" "}
        {cityConnection.endCity}.
      </p>
      <p>Diese kostet {} Punkt/e</p>
      <p>Möchtest du trotzdem fortfahren?</p>
      <button onClick={submitOnClick}>Kauf fortfahren</button>
      <button onClick={() => setIsPopUpActivated(false)}>Schließen</button>
    </dialog>
  );
}
