export type Card = {
  title: string;
  category: CardCategory;
};

export enum CardCategory {
  ToDo = "toDo",
  InProgress = "inProgress",
  QA = "QA",
  Done = "done",
}
