import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { column } from "../../types/column";
import Modal from "react-bootstrap/Modal";
import { createCard } from "../../api/cardApi";

interface Props {
    columns: column[]
    onHide: () => void
    show: boolean
}
const CreateCard = (props: Props) => {
    // maybe just display this under the board?
    //const [columnList, setColumnList] = useState<column[] | undefined>(undefined);
    const history = useHistory();
    const [cardDescription, setCardDescription] = useState<string>("");
    const [cardTitle, setCardTitle] = useState<string>("");
    const [selectedColumn, setSelectedColumn] = useState<string>("")
    const [cardPriority, setCardPriority] = useState<string>("")

    enum Priority {
        HIGH = 'HIGH',
        MEDIUM = 'MEDIUM',
        LOW = 'LOW',
    }

    const onSubmit = () => {
        // make the api call to create a card
        //TODO: Error Handling
        createCard({
            name: cardTitle,
            columnId: selectedColumn,
            order: Math.floor(Math.random() * 10000), //TODO: leave this temporarily until backend sets order
            description: cardDescription,
            priority: cardPriority
        });
        props.onHide();
        // TODO: Update column data
        // then history.push to the board page again check what to send
        // history.push({
        //   pathname: "/board",
        //   state: { boardData: history.location.state.boardData },
        // });
    };
    const onCancel = () => {
        // check that
        setCardDescription("");
        setCardTitle("");
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
                        <label>Column</label>
                        <select
                            style={{ width: '100%', padding: '0.5%', marginBottom: '2%' }}
                            name="columnOptions" form="form_id" onChange={(e) => setSelectedColumn(e.target.value)}>
                            {props.columns ? props.columns.map((col) => <option value={col.id}>{col.name}</option>) : <></>}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>PRIORITY</label>
                        <select
                            style={{ width: '100%', padding: '0.5%', marginBottom: '2%' }}
                            name="columnOptions" form="form_id" onChange={(e) => setCardPriority(e.target.value)}>
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
                    <button className="btn btn-light btn-block" onClick={props.onHide}>
                        Cancel
          </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};
export default CreateCard;
