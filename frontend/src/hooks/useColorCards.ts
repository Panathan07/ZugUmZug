import { ColorCard } from "@customTypes/colorCards";
import {
  InvalidateQueryFilters,
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useColorCards(): [
  ColorCard[] | null,
  number | null,
  UseMutationResult<
    Response,
    Error,
    {
      colorCard: ColorCard;
      teamId: number;
    },
    unknown
  >,
] {
  const queryClient = useQueryClient();
  const [colorCards, setColorCards] = useState<ColorCard[] | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const colorCardsResponse = useQuery({
    queryKey: ["colorCards"],
    queryFn: () => getColorCards("http://localhost:3000/game/color-card/price"),
  });
  const buyColorCard = useMutation({
    mutationFn: buyColorCardFetch,
    onSuccess: (data) => {
      console.log(data);
      const message = "Karte gekauft.";
      alert(message);
    },
    onError: () => {
      alert("An Error occurred. Please try again");
    },
    onSettled: () => {
      void queryClient.invalidateQueries("teams" as InvalidateQueryFilters);
    },
  });

  useEffect(() => {
    if (colorCardsResponse.isLoading) return;
    if (colorCardsResponse.data) {
      setColorCards(colorCardsResponse.data.cards);
      setPrice(colorCardsResponse.data.price);
    }
  }, [colorCardsResponse.data, colorCardsResponse.isLoading]);

  return [colorCards, price, buyColorCard];
}

async function getColorCards(api: string) {
  const response = await fetch(api);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const cardInfo: { cards: ColorCard[]; price: number } =
    (await response.json()) as { cards: ColorCard[]; price: number };
  return cardInfo;
}

async function buyColorCardFetch({
  colorCard,
  teamId,
}: {
  colorCard: ColorCard;
  teamId: number;
}) {
  return await fetch("http://localhost:3000/game/color-card/buy", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: colorCard,
      teamId: teamId,
    }),
  });
}
