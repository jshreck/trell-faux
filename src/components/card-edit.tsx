import React from "react";

type Props = {
  onCancel: () => void;
  onSave: (title: string) => void;
};

export const CardEdit = ({ onCancel, onSave }: Props) => {
  const [title, setTitle] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleSave = () => {
    onSave(title);
  };

  return (
    <div>
      <div>
        <textarea
          type="text"
          id="card-edit"
          name="card-edit"
          placeholder="Enter a title for this card..."
          rows="3"
          value={title}
          onChange={handleChange}
          className="Card"
        />
      </div>
      <button type="button" disabled={!title} onClick={handleSave}>
        Add card
      </button>
      <button type="button" onClick={onCancel}>
        X
      </button>
    </div>
  );
};
