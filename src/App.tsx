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
import Modal from "react-modal";

const title = {
  [CardCategory.ToDo]: "To Do",
  [CardCategory.InProgress]: "In Progress",
  [CardCategory.QA]: "QA",
  [CardCategory.Done]: "Done",
};

const App = () => {
  const [cards, setCards] = React.useState<{
    [key: CardCategory]: Card[];
  }>({
    [CardCategory.ToDo]: [],
    [CardCategory.InProgress]: [],
    [CardCategory.QA]: [],
    [CardCategory.Done]: [],
  });
  const [draggingCard, setDraggingCard] = React.useState<Card | null>(null);
  const [lastIdUsed = 20, setLastIdUsed] = React.useState<number>(20);
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(true);

  const useSampleData = () => {
    setCards({
      [CardCategory.ToDo]: mockToDoCards,
      [CardCategory.InProgress]: mockInProgressCards,
      [CardCategory.QA]: mockQaCards,
      [CardCategory.Done]: mockDoneCards,
    });
    closeModal();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onAddNewCard = (card: Partial<Card>) => {
    const id = lastIdUsed + 1;
    setLastIdUsed(id);
    const cardCategory = card.category;
    const newCol = [...cards[cardCategory], { ...card, id }];

    setCards({ ...cards, [cardCategory]: newCol });
  };

  const onDragCard = (card: Card) => {
    setDraggingCard(card);
  };

  const onMoveCardTo = (toCategory: CardCategory, cardAfter?: Card) => {
    const removeFrom = {};
    if (toCategory !== draggingCard.category) {
      removeFrom[draggingCard.category] = cards[draggingCard.category].filter(
        (c: Card) => c.id !== draggingCard.id
      );
    }

    const newCard = { ...draggingCard, category: toCategory };
    setDraggingCard(newCard);

    const newCol = [...cards[toCategory]].filter(
      (card) => card.id !== newCard.id
    );
    const cardAfterIndex = newCol.findIndex(
      (card) => card.id === cardAfter?.id
    );
    newCol.splice(
      cardAfterIndex > -1 ? cardAfterIndex : newCol.length,
      0,
      newCard
    );

    setCards({ ...cards, [toCategory]: newCol, ...removeFrom });
  };

  return (
    <div className="App">
      <div className="Container">
        {Object.keys(cards).map((key) => (
          <Column
            key={key}
            title={title[key]}
            category={key}
            cards={cards[key]}
            onAddNewCard={onAddNewCard}
            onMoveCardTo={onMoveCardTo}
            onDragCard={onDragCard}
            draggingCard={draggingCard}
          />
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            textAlign: "center",
            width: "fit-content",
            height: "fit-content",
          },
        }}
        contentLabel="Example Modal"
      >
        <h2>Would you like to use sample data?</h2>
        <button onClick={useSampleData}>yes</button>
        <button onClick={closeModal} style={{ marginLeft: "10px" }}>
          no
        </button>
      </Modal>
    </div>
  );
};

export default App;
