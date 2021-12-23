import React from "react";

type Props = { onClick: () => void; isDisabled: boolean };

export const AddCardBtn = ({ onClick, isDisabled }: Props) => {
  return (
    <div className="Add-card-btn" onClick={onClick}>
      + Add another card
    </div>
  );
};
