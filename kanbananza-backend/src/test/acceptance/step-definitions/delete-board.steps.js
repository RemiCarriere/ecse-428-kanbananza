import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID003-delete-board.feature"
);

let errMsg = "";
let responseStatus = "";
let userID = "";
let selectedBoard = "";
let colID = "";
let numCards = 0;

const givenFizBinLoggedIn = (given) => {
  given("user with username Fizbin is logged in", async () => {
    await request.post("/user").send({
      email: "fiz@bin.com",
      firstName: "fiz",
      lastName: "bin",
      password: "password",
    });
    const res = await request
      .post("/login")
      .send({ email: "fiz@bin.com", password: "password" });
    userID = res.body.id;
  });
};

const andUserHasOneBoard = (and) => {
  and(/^the user has one board with name (.*)$/, async (boardName) => {
    const res = await request
      .post("/board")
      .send({ ownerId: userID, name: boardName });
    selectedBoard = res.body.id;
  });
};

const whenUserDeleteBoardExist = (when) => {
  when(/^the user attempts to delete column with name (.*)$/, async () => {
    const res = await request.delete(`/boards/${selectedBoard}`);
    expect(res.status).toBe(204);
  });
};
const whenUserDeleteBoardDoesntExist = (when) => {
  when(
    "the user attempts to delete a board with non existant name",
    async () => {
      const res = await request.delete(`/boards/39439348394833`); // random id
      expect(res.status).toBe(400);
    }
  );
};

const thenTheUserNoBoard = (then) => {
  then("the user won't have any more boards", async () => {
    const res = await request.get(`/boards`);
    expect(res.body.length).toBe(0);
  });
};

const thenTheUserOneBoard = (then) => {
  then(/^the user will still have one board with name (.*)$/, async () => {
    const res = await request.get(`/boards`);
    expect(res.body.length).toBe(1);
  });
};

defineFeature(feature, (test) => {
  test("Delete the board (Normal Flow)", ({ given, and, when, then }) => {
    givenFizBinLoggedIn(given);

    andUserHasOneBoard(and);

    whenUserDeleteBoardExist(when);

    thenTheUserNoBoard(then);
  });

  test("Delete board that does not exist (Error Flow)", ({
    given,
    and,
    when,
    then,
  }) => {
    givenFizBinLoggedIn(given);

    andUserHasOneBoard(and);

    whenUserDeleteBoardDoesntExist(when);

    thenTheUserOneBoard(then);
  });
});
