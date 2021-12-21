import React from "react";

type Props = { onClick: () => void };

export const AddCardBtn = ({ onClick }: Props) => {
  return (
    <button type="button" className="Add-card-btn" onClick={onClick}>
      + Add another card
    </button>
  );
};
