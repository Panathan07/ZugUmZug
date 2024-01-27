import { useEffect, useRef } from "react";

export function BuyRoadPopUp({
  active,
  submitBuyRoad,
  setIsPopUpActivated,
}: {
  active: boolean;
  submitBuyRoad: () => void;
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
    submitBuyRoad();
    setTimeout(() => setIsPopUpActivated(false));
  }

  return (
    <dialog ref={popUpRef} style={{ background: "black" }}>
      <p>Hello</p>
      <button onClick={submitOnClick}>Continue Purchase</button>
      <button onClick={() => setIsPopUpActivated(false)}>Close</button>
    </dialog>
  );
}
