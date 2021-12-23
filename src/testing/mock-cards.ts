import { CardCategory } from "../types/card.ts";

export const mockToDoCards = Array(5)
  .fill("")
  .map((curr, index) => ({
    id: `${CardCategory.ToDo}-${index}`,
    title: `test - ${CardCategory.ToDo} - ${index}`,
    category: CardCategory.ToDo,
  }));

export const mockInProgressCards = Array(5)
  .fill("")
  .map((curr, index) => ({
    id: `${CardCategory.InProgress}-${index}`,
    title: `test - ${CardCategory.InProgress} - ${index}`,
    category: CardCategory.InProgress,
  }));

export const mockQaCards = Array(5)
  .fill("")
  .map((curr, index) => ({
    id: `${CardCategory.QA}-${index}`,
    title: `test - ${CardCategory.QA} - ${index}`,
    category: CardCategory.QA,
  }));

export const mockDoneCards = Array(5)
  .fill("")
  .map((curr, index) => ({
    id: `${CardCategory.Done}-${index}`,
    title: `test - ${CardCategory.Done} - ${index}`,
    category: CardCategory.Done,
  }));
