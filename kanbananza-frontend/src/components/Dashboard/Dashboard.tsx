import { useState, useEffect } from "react";
import { checkToken, getUserBoards } from "../../api/userApi";
import Cookies from "js-cookie";
import { board } from "../../types/board";
import { useHistory } from "react-router-dom";
import BoardSummary from "./BoardSummary";
import CreateBoard from "./CreateBoardModal";
var ownerID;
const Dashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const [usrName, setUsrName] = useState("initial");
  const [boards, setBoards] = useState<Array<board>>([]);
  const [newBoardName, setNewBoardName] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function initializeData() {
      const loginRes = await checkToken(Cookies.get("token"));
      console.log(loginRes);
      if (!loginRes || (loginRes && !loginRes.email)) {
        history.push("/sign-in");
        return;
      }
      ownerID = loginRes.id;
      setUsrName(loginRes.firstName + " " + loginRes.lastName);
      const boardRes = await getUserBoards(ownerID);
      setBoards(boardRes);
    }
    initializeData();
  }, [usrName]);

  function populateBoard() {
    return boards.map((board, index) => {
      if (board && board.name) {
        return (
          <div className="col-md-4" key={index}>
            <BoardSummary board={board} />
          </div>
        );
      }
    });
  }

  return (
    <div className="container-fluid">
      <CreateBoard
        show={modalShow}
        onHide={() => setModalShow(false)}
        ownerid={ownerID}
      />
      <div className="row">
        <div className="col-md-12">
          <h2>{usrName}'s Projects</h2>
          <div className="row">
            <div className="col-md-4">
              <div
                onClick={() => setModalShow(true)}
                className="board-button btn-outline-secondary"
              >
                <h3>Create a new project</h3>
              </div>
            </div>
            {populateBoard()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
