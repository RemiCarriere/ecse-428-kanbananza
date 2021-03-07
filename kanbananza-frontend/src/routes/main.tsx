import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/Login/Login";
import Signup from "../components/Login/Signup";
import UserHome from "../components/UserHome/UserHome";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import "../index.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Board from "../components/Board/Board";
import CreateCard from "../components/Card/CreateCard";
import TmpBoard from "../components/Board/tmpBoard";

const Main = () => {
  const [loggedIn, setloggedIn] = useState<boolean>(Cookies.get("token"));
  function onLogout(event: any) {
    Cookies.remove("token");
    setloggedIn(false);
  }
  function onLogin() {
    setloggedIn(true);
  }

  function loginLogoutLink() {
    return loggedIn ? (
      <li className="nav-item">
        <Link className="nav-link" onClick={onLogout} to={"/sign-in"}>
          Logout
        </Link>
      </li>
    ) : (
        <li className="nav-item">
          <Link className="nav-link" to={"/sign-in"}>
            Login
        </Link>
        </li>
      );
  }
  function signUpLink() {
    return loggedIn ? (
      ""
    ) : (
        <li className="nav-item">
          <Link className="nav-link" to={"/sign-up"}>
            Sign up
        </Link>
        </li>
      );
  }

  return (
    <Router>
      <div className="App">
        <div>
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/"}>
                Kanbananza
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  {loginLogoutLink()}
                  {signUpLink()}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <Switch>
          {/* <Route exact path="/" component={Login()}/> */}
          <Route path="/sign-in">
            <Login setloggedIn={setloggedIn} />
          </Route>
          <Route path="/sign-up">
            <Signup setloggedIn={setloggedIn} />
          </Route>
          <Route path="/home" component={UserHome} />
          <Route path="/board" component={Board} />
          <Route path="/createCard" component={CreateCard} />
        </Switch>
      </div>
    </Router>
  );
};

export default Main;
