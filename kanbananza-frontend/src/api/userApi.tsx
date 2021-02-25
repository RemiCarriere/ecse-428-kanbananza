import API from "./api";

export const createLogin = (email, password): any => {
  return API.post("/login", { email: email, password: password })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const checkToken = (token): any => {
  return API.get("/login", {
    headers: {
      Authorization: "Token " + token,
    },
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getUserBoards = (id: string): any => {
  return API.get(`/user/${id}/boards`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
