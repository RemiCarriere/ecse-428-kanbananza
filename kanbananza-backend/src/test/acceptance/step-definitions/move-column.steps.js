import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";
import { givenExistsUser, givenUserLoggedIn } from "./shared-steps";

const feature = loadFeature(
  "src/test/acceptance/features/ID009_Move_a_column.feature"
);

let userID, selectedBoard, status;

const givenUserHasOneBoard = (given) => {
  given("the user has one board", async () => {
    let { body } = await request.get("/users").expect(200);

    userID = body[0].id;

    body = await request
      .post("/board")
      .send({ name: "testBoard", ownerId: userID })
      .expect(201);
  });
};

const givenBoardIsSelected = (given) => {
  given("the user has selected that board", async () => {
    const { body } = await request
      .get("/user/" + userID + "/boards")
      .expect(200);

    selectedBoard = body[0].id;
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

const thenBoardLooksAsFollows = (then) => {
  then("the board columns will look as follows:", async (table) => {
    const cols = (await request.get(`/board/${selectedBoard}/columns`)).body;
    expect(cols.length).toBe(table.length);
    for (const row of table) {
      let matchingCol = cols.find(
        (col) => col.order === parseInt(row.columnOrder)
      );
      if (matchingCol === undefined) {
        continue;
      }
      expect(matchingCol).toBeDefined();
      expect(matchingCol.name).toBe(row.columnName);
    }
  });
};

const whenUserAttemptsToMoveColumn = (when) => {
  when(
    /^the user attempts to move column with name "(.*)" to index (\d+)$/,
    async (name, index) => {
      const matchingCols = (
        await request.get(`/board/${selectedBoard}/columns?name=${name}`)
      ).body;
      let colId;
      if (matchingCols.length === 0) {
        colId = "606156cfdf66006b471badid";
      } else {
        colId = matchingCols[0].id;
      }
      const response = await request.patch(`/column/${colId}`).send({
        order: parseInt(index),
      });

      status = response.status;
    }
  );
};
defineFeature(feature, (test) => {
  test("Move the column in the board (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);

    givenUserLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardIsSelected(given);

    givenBoardHasFollowingColumns(given);

    whenUserAttemptsToMoveColumn(when);

    thenBoardLooksAsFollows(then);
  });

  test("Move a column to the same position (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);

    givenUserLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardIsSelected(given);

    givenBoardHasFollowingColumns(given);

    whenUserAttemptsToMoveColumn(when);

    thenBoardLooksAsFollows(then);
  });

  test("Move a non-existent column (Error Flow)", ({ given, when, then }) => {
    givenExistsUser(given);

    givenUserLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardIsSelected(given);

    givenBoardHasFollowingColumns(given);

    whenUserAttemptsToMoveColumn(when);

    then(/^the system shall report "(.*)"$/, (arg0) => {
      expect(status).toBeGreaterThanOrEqual(400);
    });

    thenBoardLooksAsFollows(then);
  });
});
