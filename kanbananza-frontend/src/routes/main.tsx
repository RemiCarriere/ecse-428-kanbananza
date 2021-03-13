import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/Login/Login";
import Signup from "../components/Login/Signup";
import Dashboard from "../components/Dashboard/Dashboard";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./app.css";
import "../index.css";
import Board from "../components/Board/Board";
import NavBar from "../components/NavBar/NavBar";
import { useState } from "react";
import Cookies from "js-cookie";

const Main = () => {
  const [loggedIn, setloggedIn] = useState<boolean>(Cookies.get("token"));

  return (
    <Router>
      <NavBar setloggedIn={setloggedIn} loggedIn={loggedIn} />
      <Switch>
        <Route path="/sign-up">
          <Signup setloggedIn={setloggedIn} />
        </Route>
        <Route path="/home" component={Dashboard} />
        <Route path="/board" component={Board} />
        <Route path="/sign-in">
          <Login setloggedIn={setloggedIn} />
        </Route>
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default Main;
