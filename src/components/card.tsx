import React from "react";
import { Card as CardType } from "../types/card";

type Props = {
  card: CardType;
  onDragCard: (card: CardType | null) => void;
  cardRef: any;
  isDragging: boolean;
};

export const Card = ({ card, onDragCard, cardRef, isDragging }: Props) => {
  const onDragStart = (event: DragEvent) => {
    onDragCard(card);
  };

  return (
    <div
      ref={cardRef}
      className={`Card ${isDragging ? "Dragging" : null}`}
      draggable
      onDragStart={onDragStart}
    >
      {card.title}
    </div>
  );
};
