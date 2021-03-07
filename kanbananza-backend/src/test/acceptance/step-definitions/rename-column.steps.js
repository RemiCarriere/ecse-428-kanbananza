import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID008-rename-a-column.feature"
);

let errMsg = "";
let userID = "";
let selectedBoard = "";

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

const givenUserHasOneBoard = (given) => {
  given("the user owns one board", async () => {
    const res = await request
      .post("/board")
      .send({ ownerId: userID, name: "test-board-name" })
      .expect(201);
    selectedBoard = res.body.id;
  });
};

const givenBoardSelected = (given) => {
  given("the user has selected that board", () => {
    selectedBoard = selectedBoard; //rendundant step for our implementation
  });
};

const givenBoardHasFollowingColumns = (given) => {
  given(
    "the selected board has three columns ordered as follows:",
    async (table) => {
      for (const row of table) {
        await request.post("/column").send({
          name: row.columnName,
          boardId: selectedBoard,
          order: parseInt(row.columnOrder)
        });
      }
    }
  );
};

const whenUserAttemptsToUpdateColumn = (when) => {
  when(
    /^the user attempts to update column "(.*)" with name "(.*)"$/,
    async (name, newName) => {
      let res = await request.get(`/board/${selectedBoard}/columns`);
      let colId = res.body.filter((column) => column.name === name)[0];
      if (colId) {
        colId = colId.id;
      } else {
        colId = "non-existent column";
      }
      res = await request.put(`/columns/${colId}`)
      .send({ name: newName })
      .expect(201);

      if (res.body.errors) {
        errMsg = res.body.errors[0].reason;
      }
    }
  );
};

const thenBoardLooksAsFollows = (then) => {
  then(
    "the board will look as follows:",
    async (table) => {
      const cols = await request.get(`/board/${selectedBoard}/columns`);
      for (const row of table) {
        expect(row.columnName).toBe(cols[row.columnOrder].name)
      }
    }
  );
};

const thenSystemShallReport = (then) => {
  then(
    /^the system shall report "(.*)"$/,
    async(msg) => {  
      expect(errMsg).toBe(msg);
    }
  );
};

//TODO: Implement the step definitions and remove .skip
defineFeature(feature, (test) => {
  test.skip("Rename a column with a valid name (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenFizBinLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardSelected(given);

    givenBoardHasFollowingColumns(given);

    whenUserAttemptsToUpdateColumn(when);

    thenBoardLooksAsFollows(then);
  });

  test.skip("Rename column to an already existing name (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {

    givenFizBinLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardSelected(given);

    givenBoardHasFollowingColumns(given);

    whenUserAttemptsToUpdateColumn(when);

    thenSystemShallReport(then);

    thenBoardLooksAsFollows(then);
  });

  test.skip("Rename a column to empty name (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenFizBinLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardSelected(given);

    givenBoardHasFollowingColumns(given);

    whenUserAttemptsToUpdateColumn(when);

    thenSystemShallReport(then);

    thenBoardLooksAsFollows(then);
  });
});
