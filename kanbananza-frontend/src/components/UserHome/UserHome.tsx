import { useState, useEffect } from "react";
import { checkToken, getUserBoards } from "../../api/userApi";
import Cookies from "js-cookie";
import { board } from "../../types/board";
import { createBoard } from "../../api/boardApi";

const UserHome = () => {
  const [value, setValue] = useState("initial");
  const [value1, setValue1] = useState<Array<board>>([]);
  const [value3, setValue3] = useState("");
  useEffect (() => {
    async function initializeData(){
      // This effect uses the `value` variable,
      // so it "depends on" `value`.
      const loginRes = await checkToken(Cookies.get("token"));
      setValue(loginRes.email)
      const boardRes = await getUserBoards(loginRes._id);
      setValue1(boardRes)
  }
  initializeData()
  }, [value]); // pass `value` as a dependency

  function renderTableData() {
    return value1.map((board, index)=>{
      const projName = board.name
       return (
        <div className="col-md-4">
          <h3>{projName}</h3>
          <p>Project description</p>
        </div>
       )
      })
 }

 async function onNewProject(event: any) {
  if (1) {
    try {
      await createBoard({ ownerId: "603466d60f3f434b50600695", name: value3 });
      window.location.reload();
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
                <h2>{value}</h2>
                <p>View your recent projects, or create a new one.</p>
                {/* <p>
                  <a className="btn btn-primary btn-large"  onClick={onNewProject}>
                    New Project
                  </a>
                </p> */}
                <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
               <input className="form-control" id="inputPassword2" onChange={(e) => setValue3(e.target.value)} placeholder="New Project Name"></input>
               </div>
              <button type="button" onClick={onNewProject} className="btn btn-primary mb-2">New Project</button>
              </form>



              </div>
              <div className="row">
              {renderTableData()}
              </div>
            </div>
          </div>
    
        </div>
      </div>
    </div>
  );
};
export default UserHome;
