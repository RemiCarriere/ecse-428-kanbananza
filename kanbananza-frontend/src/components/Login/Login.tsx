import { useState } from "react";
import { createLogin } from "../../api/userApi";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { propTypes } from "react-bootstrap/esm/Image";
import $ from "jquery";

const Login = (params) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  var error;

  async function onLogin(event: any) {
    const res = await createLogin(email, password);
    if (res && res.token) {
      Cookies.set("token", res.token);
      params.setloggedIn(true);
      history.push("/home");
    } else {
      $("#error").text("Wrong Email or Password!");
      $("#error").css("color", "red");
      console.log("here");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Sign In</h3>

          <span id="error"></span>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={onLogin}
            type="button"
            className="btn btn-outline-secondary btn-block"
          >
            Submit
          </button>
          <p className="forgot-password text-right">
            Not yet registered? <a href="/sign-up">Create an account here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
