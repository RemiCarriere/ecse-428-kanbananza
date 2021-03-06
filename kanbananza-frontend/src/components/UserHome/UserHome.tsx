import { useState, useEffect } from "react";
import { checkToken, getUserBoards, getUser } from "../../api/userApi";
import Cookies from "js-cookie";
import { board } from "../../types/board";
import { createBoard } from "../../api/boardApi";
import { useHistory } from "react-router-dom";

var ownerID;
const UserHome = () => {
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
      setUsrName(loginRes.firstName + " " + loginRes.lastName);
      const boardRes = await getUserBoards(loginRes.id);
      setBoards(boardRes);
    }
    initializeData();
  }, [usrName]);

  const handleClick = (board) => {
    history.push({ pathname: "/board", state: { board: board } }); // test this
  };
  function populateBoard() {
    return boards.map((board, index) => {
      if (board && board.name) {
        return (
          <div className="col-md-4" key={index}>
            <button
              style={{
                background: "none",
                border: "none",
                margin: "0",
                padding: "0",
              }}
              onClick={() => handleClick(board)}
            >
              <h3>{board.name}</h3>
            </button>
            <p>Project description</p>
          </div>
        );
      }
    });
  }

  async function onNewProject(event: any) {
    if (newBoardName) {
      try {
        const a = await createBoard({ ownerId: ownerID, name: newBoardName });
        boards.push(a);
        setBoards(boards);
        // Needs to be fixed to update board component dynamically
        // if boards is added to useEffect() as dependency,
        // it works, but we get an infinite loop
        // https://dmitripavlutin.com/react-useeffect-infinite-loop/
        window.location.reload(); //TODO remove this line when issue above is solved
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <div className="home-wrapper">
      <div className="home-inner">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="jumbotron">
                <h2>{usrName}</h2>
                <p>View your recent projects, or create a new one.</p>
                {/* <p>
                  <a className="btn btn-primary btn-large"  onClick={onNewProject}>
                    New Project
                  </a>
                </p> */}
                <form className="form-inline">
                  <div className="form-group mx-sm-3 mb-2">
                    <input
                      className="form-control"
                      id="inputPassword2"
                      onChange={(e) => setNewBoardName(e.target.value)}
                      placeholder="New Project Name"
                    ></input>
                  </div>
                  <button
                    type="button"
                    onClick={onNewProject}
                    className="btn btn-primary mb-2"
                  >
                    Create Project
                  </button>
                </form>
              </div>
              <div className="row">{populateBoard()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserHome;
