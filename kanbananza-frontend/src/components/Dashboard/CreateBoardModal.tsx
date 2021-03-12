import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { column } from "../../types/column";
import Modal from "react-bootstrap/Modal";
import { createBoard } from "../../api/boardApi";

interface Props {
  onHide: () => void;
  show: boolean;
  ownerid: string;
}

const CreateBoard = (props: Props) => {
  // maybe just display this under the board?
  //const [columnList, setColumnList] = useState<column[] | undefined>(undefined);
  const history = useHistory();
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");

  enum Priority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW",
  }
  const onSubmit = async () => {
    // make the api call to create a card
    if (projectName) {
      try {
        const a = await createBoard({
          ownerId: props.ownerid,
          name: projectName,
        });
        // Needs to be fixed to update board component dynamically
        // if boards is added to useEffect() as dependency,
        // it works, but we get an infinite loop
        // https://dmitripavlutin.com/react-useeffect-infinite-loop/
        window.location.reload(); //TODO remove this line when issue above is solved
      } catch (err) {
        console.log(err);
      }
    }
    //TODO: Error Handling
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
          Create a Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="form_id">
          <div className="form-group">
            <label>Project Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the card title"
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Project Description</label>
            <textarea
              className="form-control"
              placeholder="Enter card Description"
              onChange={(e) => setProjectDescription(e.target.value)}
            />
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
export default CreateBoard;
