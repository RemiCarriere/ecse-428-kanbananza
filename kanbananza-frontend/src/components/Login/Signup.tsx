import { useState } from "react";
import Cookies from "js-cookie";
import { createUser } from "../../api/userApi";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import { Check } from "@material-ui/icons";

const Signup = (params) => {
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setconfirmPassword] = useState<string>("");
  const history = useHistory();
  var error;
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  async function onLogin(event: any) {
    //need to add error if user account is already created

    if (password !== confirmpassword) {
      $("#error").text("Passwords Do Not Match!");
      $("#error").css("color", "red");
    }
    if (!pattern.test(email)) {
      $("#error1").text("Please Enter A Valid Email!");
      $("#error1").css("color", "red");
    } else {
      const res = await createUser(firstname, lastname, email, password);

      if (res && res.token) {
        Cookies.set("token", res.token);
        params.setloggedIn(true);
        history.push("/home");
      }
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <span id="error1"></span>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <span id="error"></span>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={onLogin}
            className="btn btn-outline-secondary btn-block"
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered? <a href="/sign-in">Sign-in</a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Signup;
