import "./App.css";
import React from "react";
import { Column } from "./components/column.tsx";
import { Card, CardCategory } from "./types/card.ts";

const card: Card = {
  title: "test",
  category: CardCategory.ToDo,
};

const App = () => {
  const [cards, setCards] = React.useState<Card[]>(Array(5).fill(card));

  //TODO: for ea col
  const onAddNewCard = (card: Card) => {
    setCards([...cards, card]);
  };

  return (
    <div className="App">
      <Column
        title="To Do"
        category={CardCategory.ToDo}
        cards={cards}
        onAddNewCard={onAddNewCard}
      />
      <Column
        title="In Progress"
        category={CardCategory.InProgress}
        cards={cards}
        onAddNewCard={onAddNewCard}
      />
      <Column
        title="QA"
        category={CardCategory.QA}
        cards={cards}
        onAddNewCard={onAddNewCard}
      />
      <Column
        title="Done"
        category={CardCategory.Done}
        cards={cards}
        onAddNewCard={onAddNewCard}
      />
    </div>
  );
};

export default App;
