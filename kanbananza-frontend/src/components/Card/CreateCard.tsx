import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { column } from "../../types/column";

const CreateCard = () => {
  // maybe just display this under the board?
  const [columnList, setColumnList] = useState<column[] | undefined>(undefined);
  const history = useHistory();
  const [cardDescription, setCardDescription] = useState<string>("");
  const [cardTitle, setCardTitle] = useState<string>("");

  useEffect(() => {
    if (history.location.state) {
      setColumnList(history.location.state.columns);
    }
  }, []);

  const onSubmit = () => {
    // make the api call to create a card

    // then history.push to the board page again check what to send
    history.push({
      pathname: "/board",
      state: { boardData: history.location.state.boardData },
    });
  };
  const onCancel = () => {
    // check that
    setCardDescription("");
    setCardTitle("");
  };

  return (
    <>
      <form>
        <h3>Create Card</h3>

        <div className="form-group">
          <label>Card Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setCardTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Card Description</label>
          <textarea
            className="form-control"
            placeholder="Enter card Description"
            onChange={(e) => setCardDescription(e.target.value)}
          />
        </div>

        <button
          onClick={onSubmit}
          type="button"
          className="btn btn-primary btn-block"
        >
          Submit
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="btn btn-primary btn-block"
        >
          Cancel
        </button>
      </form>
    </>
  );
};
export default CreateCard;
