import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Cookies from "js-cookie";

const NavBar = (props) => {
  function onLogout(event: any) {
    Cookies.remove("token");
    props.setloggedIn(false);
  }
  function onLogin() {
    props.setloggedIn(true);
  }

  function loginLogoutLink() {
    return props.loggedIn ? (
      <li className="nav-item">
        <Link className="nav-link" onClick={onLogout} to={"/sign-in"}>
          Logout
        </Link>
      </li>
    ) : (
      <li className="nav-item">
        <Link className="nav-link" to={"/sign-in"}>
          Sign-in
        </Link>
      </li>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="favicon.ico" width="25" height="25" alt="" />
          </a>
          <Link className="navbar-brand" to={"/"}>
            Kanbananza
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">{loginLogoutLink()}</ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
