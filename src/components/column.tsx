import React from "react";
import { AddCardBtn } from "./add-card-btn.tsx";
import { CardEdit } from "./card-edit.tsx";
import { Card } from "./card.tsx";
import { Card as CardType } from "../types/card.ts";
import { CardCategory } from "../types/card";

type Props = {
  title: string;
  category: CardCategory;
  cards: Card[];
  onAddNewCard: (card: CardType) => void;
};

export const Column = ({ title, category, cards, onAddNewCard }: Props) => {
  const [isAddingCard, setIsAddingCard] = React.useState<boolean>(false);

  const onAddCardClick = () => {
    setIsAddingCard(true);
  };

  const onCancelAddCard = () => {
    setIsAddingCard(false);
  };

  const handleAddNewCard = (title: string) => {
    onAddNewCard({ title, category });
    setIsAddingCard(false);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    console.log(`Dragging over ${category}`);
  };

  const onDrop = (event) => {
    console.log(`Dropped in ${category}`);
  };

  return (
    <div className="Column" onDragOver={onDragOver} onDrop={onDrop}>
      <p>{title}</p>
      <div>
        {cards.map((card) => (
          <Card card={card} />
        ))}
        {isAddingCard && (
          <CardEdit onCancel={onCancelAddCard} onSave={handleAddNewCard} />
        )}
      </div>
      <AddCardBtn onClick={onAddCardClick} />
    </div>
  );
};
