import "./App.css";
import React from "react";
import { Column } from "./components/column.tsx";
import { Card, CardCategory } from "./types/card.ts";
import {
  mockToDoCards,
  mockInProgressCards,
  mockQaCards,
  mockDoneCards,
} from "./testing/mock-cards.ts";

const App = () => {
  const [toDoCards, setToDoCards] = React.useState<Card[]>(mockToDoCards);
  const [inProgressCards, setInProgressCards] =
    React.useState<Card[]>(mockInProgressCards);
  const [qaCards, setQaCards] = React.useState<Card[]>(mockQaCards);
  const [doneCards, setDoneCards] = React.useState<Card[]>(mockDoneCards);
  const [draggingCard, setDraggingCard] = React.useState<Card | null>(null);
  const [lastIdUsed = 20, setLastIdUsed] = React.useState<number>(20);
  const categories = [
    {
      title: "To Do",
      category: CardCategory.ToDo,
      cards: toDoCards,
    },
    {
      title: "In Progress",
      category: CardCategory.InProgress,
      cards: inProgressCards,
    },
    { title: "QA", category: CardCategory.QA, cards: qaCards },
    { title: "Done", category: CardCategory.Done, cards: doneCards },
  ];

  const onAddNewCard = (card: Partial<Card>) => {
    const id = lastIdUsed + 1;
    setLastIdUsed(id);
    switch (card.category) {
      case CardCategory.ToDo:
        setToDoCards([...toDoCards, { ...card, id }]);
        break;
      case CardCategory.InProgress:
        setInProgressCards([...inProgressCards, { ...card, id }]);
        break;
      case CardCategory.QA:
        setQaCards([...qaCards, { ...card, id }]);
        break;
      case CardCategory.Done:
        setDoneCards([...doneCards, { ...card, id }]);
    }
  };

  const onDragCard = (card: Card) => {
    setDraggingCard(card);
  };

  const onMoveCardTo = (toCategory: CardCategory, cardAfter?: Card) => {
    if (toCategory !== draggingCard.category) {
      removeFromCategory(draggingCard);
    }

    const newCard = { ...draggingCard, category: toCategory };

    switch (toCategory) {
      case CardCategory.ToDo:
        {
          const filtered = toDoCards.filter((card) => card.id !== newCard.id);
          const cardAfterIndex = filtered.findIndex(
            (card) => card.id === cardAfter?.id
          );

          filtered.splice(
            cardAfterIndex > -1 ? cardAfterIndex : filtered.length,
            0,
            newCard
          );
          setToDoCards(filtered);
        }
        break;
      case CardCategory.InProgress:
        {
          const filtered = inProgressCards.filter(
            (card) => card.id !== newCard.id
          );
          const cardAfterIndex = filtered.findIndex(
            (card) => card.id === cardAfter?.id
          );

          filtered.splice(
            cardAfterIndex > -1 ? cardAfterIndex : filtered.length,
            0,
            newCard
          );
          setInProgressCards(filtered);
        }
        break;
      case CardCategory.QA:
        {
          const filtered = qaCards.filter((card) => card.id !== newCard.id);
          const cardAfterIndex = filtered.findIndex(
            (card) => card.id === cardAfter?.id
          );

          filtered.splice(
            cardAfterIndex > -1 ? cardAfterIndex : filtered.length,
            0,
            newCard
          );
          setQaCards(filtered);
        }
        break;
      case CardCategory.Done: {
        const filtered = doneCards.filter((card) => card.id !== newCard.id);
        const cardAfterIndex = filtered.findIndex(
          (card) => card.id === cardAfter?.id
        );

        filtered.splice(
          cardAfterIndex > -1 ? cardAfterIndex : filtered.length,
          0,
          newCard
        );
        setDoneCards(filtered);
      }
    }
  };

  const removeFromCategory = (card: Card) => {
    const filterCondition = (c: Card) => c.id !== card.id;
    switch (card.category) {
      case CardCategory.ToDo:
        setToDoCards(toDoCards.filter(filterCondition));
        break;
      case CardCategory.InProgress:
        setInProgressCards(inProgressCards.filter(filterCondition));
        break;
      case CardCategory.QA:
        setQaCards(qaCards.filter(filterCondition));
        break;
      case CardCategory.Done:
        setDoneCards(doneCards.filter(filterCondition));
    }
  };

  return (
    <div className="App">
      {" "}
      <div className="Container">
        {categories.map((category) => (
          <Column
            key={category.category}
            {...category}
            onAddNewCard={onAddNewCard}
            onMoveCardTo={onMoveCardTo}
            onDragCard={onDragCard}
            draggingCard={draggingCard}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
