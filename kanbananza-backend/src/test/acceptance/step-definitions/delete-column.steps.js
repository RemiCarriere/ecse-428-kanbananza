import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID0010-delete-a-column.feature"
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
  given("the user has one board", async () => {
    const res = await request
      .post("/board")
      .send({ ownerId: userID, name: "test-board-name" });
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
          order: parseInt(row.columnOrder),
        });
      }
    }
  );
};

const whenUserAttemptsToDeleteColumn = (when) => {
  when(
    /^the user attempts to delete column with name "(.*)"$/,
    async (colName) => {
      const res = await request.get(`/board/${selectedBoard}/columns`);
      let colId = res.body.filter((column) => column.name === colName)[0];
      if (colId) {
        colId = colId.id;
      } else {
        colId = "non-existent column";
      }
      const res1 = await request.delete(`/column/${colId}`);
      if (res1.body) {
        errMsg = res1.body.errors;
      }
    }
  );
};

defineFeature(feature, (test) => {
  test("Delete column that does not exist (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenFizBinLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardSelected(given);

    givenBoardHasFollowingColumns(given);

    whenUserAttemptsToDeleteColumn(when);

    then(/^an error "(.*)" is issued$/, (error) => {
      expect(errMsg).not.toBe("");
    });

    then("the board will have the following columns:", async (table) => {
      const res = await request.get(`/board/${selectedBoard}/columns`);
      expect(res.body.length).toBe(table.length);
    });
  });

  test("Delete a column from the board (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenFizBinLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardSelected(given);

    givenBoardHasFollowingColumns(given);

    whenUserAttemptsToDeleteColumn(when);

    then("the board will have the following columns:", async (table) => {
      const res = await request.get(`/board/${selectedBoard}/columns`);
      expect(res.body.length).toBe(table.length);
    });
  });
});
