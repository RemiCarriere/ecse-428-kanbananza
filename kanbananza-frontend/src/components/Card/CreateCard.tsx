import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { column } from "../../types/column";
import Modal from "react-bootstrap/Modal";
import { createCard } from "../../api/cardApi";

interface Props {
  columns: column[];
  onHide: () => void;
  show: boolean;
  order: number;
}
const CreateCard = (props: Props) => {
  // maybe just display this under the board?
  //const [columnList, setColumnList] = useState<column[] | undefined>(undefined);
  const history = useHistory();
  const [cardDescription, setCardDescription] = useState<string>("");
  const [cardTitle, setCardTitle] = useState<string>("");
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [cardPriority, setCardPriority] = useState<string>("");

  enum Priority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW",
  }

  const onSubmit = () => {
    // make the api call to create a card
    //TODO: Error Handling
    // console.log(props.columns[0].id)
    const order = props.order;
    createCard({
      name: cardTitle,
      columnId: props.columns[0].id,
      order: order + 1, //TODO: leave this temporarily until backend sets order
      description: cardDescription,
      // priority: cardPriority, //TODO implement
    });
    props.onHide();
    // TODO: Update column data
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a new card
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="form_id">
          <div className="form-group">
            <label>Card Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the card title"
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
          <div className="form-group">
            <label>PRIORITY</label>
            <select
              style={{ width: "100%", padding: "0.5%", marginBottom: "2%" }}
              name="columnOptions"
              form="form_id"
              onChange={(e) => setCardPriority(e.target.value)}
            >
              <option value={Priority.HIGH}>{Priority.HIGH}</option>
              <option value={Priority.MEDIUM}>{Priority.MEDIUM}</option>
              <option value={Priority.LOW}>{Priority.LOW}</option>
            </select>
          </div>
          <button
            onClick={onSubmit}
            type="button"
            className="btn btn-primary btn-block"
          >
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default CreateCard;
