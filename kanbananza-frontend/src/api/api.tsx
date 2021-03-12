import axios from "axios";

const baseUrl =
  process.env.REACT_APP_NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://kanbananza-backend.herokuapp.com/";
export default axios.create({
  baseURL: baseUrl,
});
