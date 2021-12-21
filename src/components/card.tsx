import React from "react";
import { Card as CardType } from "../types/card";

type Props = {
  card: CardType;
};

export const Card = ({ card }: Props) => {
  const onDragStart = (e) => {
    console.log(`drag start for ${card.title}`);
    //TODO: store what's being dragged
  };
  return (
    <div className="Card" draggable onDragStart={onDragStart}>
      {card.title}
    </div>
  );
};
