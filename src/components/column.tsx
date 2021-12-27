import React from "react";
import { AddCardBtn } from "./add-card-btn.tsx";
import { CardEdit } from "./card-edit.tsx";
import { Card } from "./card.tsx";
import { Card as CardType, CardCategory } from "../types/card.ts";

type Props = {
  title: string;
  category: CardCategory;
  cards: Card[];
  onAddNewCard: (card: Partial<CardType>) => void;
  onDragCard: (card: CardType) => void;
  onMoveCardTo: (toCategory: CardCategory, cardAfter?: Card) => void;
  draggingCard: Card;
};

export const Column = ({
  title,
  category,
  cards,
  onAddNewCard,
  onDragCard,
  onMoveCardTo,
  draggingCard,
}: Props) => {
  const [isAddingCard, setIsAddingCard] = React.useState<boolean>(false);
  const cardRefs = React.useRef({});

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

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    if (draggingCard) {
      const cardAfter = getCardAfter(event.clientY);

      if (cardAfter === null) {
        onMoveCardTo(category);
      } else {
        onMoveCardTo(category, cardAfter);
      }
    }
  };

  const getCardAfter = (positionY: number): Card | null => {
    const columnCards = cards.filter((card) => card.id !== draggingCard.id);

    const cardAfter = columnCards.reduce(
      (closestCard, card): { offset: number; card: Card | null } => {
        // get bounding box of each card
        const box = cardRefs.current[card.id].current.getBoundingClientRect();
        // find middle of the card
        const cardMiddle = box.top - box.height / 2;
        const offset = positionY - cardMiddle;
        // if offset is negative (above an element) and the offset is the least (closest element), this is new closest element
        if (offset < 0 && offset > closestCard.offset) {
          return { offset: offset, card };
        } else {
          return closestCard;
        }
      },
      { offset: Number.NEGATIVE_INFINITY, card: null }
    ).card;

    return cardAfter;
  };

  const onDrop = (event: DragEvent) => {
    onDragCard(null);
  };

  return (
    <div className="Column" onDragOver={onDragOver} onDrop={onDrop}>
      <p>
        <b>{title}</b>
      </p>
      <div>
        {cards.map((card) => {
          cardRefs.current[card.id] = React.createRef();
          return (
            <Card
              key={card.id}
              card={card}
              onDragCard={onDragCard}
              cardRef={cardRefs.current[card.id]}
              isDragging={card.id === draggingCard?.id}
            />
          );
        })}
        {isAddingCard && (
          <CardEdit onCancel={onCancelAddCard} onSave={handleAddNewCard} />
        )}
      </div>
      <AddCardBtn onClick={onAddCardClick} disabled={isAddingCard} />
    </div>
  );
};
