import API from "./api";

export const createUser = (firstName, lastName, email, password): any => {
  return API.post("/user", {
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

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

export const getUser = (id: string): any => {
  return API.get(`/user/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
