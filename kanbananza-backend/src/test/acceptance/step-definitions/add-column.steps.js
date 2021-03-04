import { defineFeature, loadFeature } from "jest-cucumber";
import { givenUserLoggedIn, givenExistsUser } from "./shared-steps";
import request from "../../support/request";

let selectedBoard = 0;
let userID;

const feature = loadFeature(
  "src/test/acceptance/features/ID007_Add-Column.feature"
);

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

const whenUserCreatesColumn = (when) => {
  when(
    /^the user attempts to create a column with name "(.*)"$/,
    async (name) => {
      const res = await request
        .post("/column")
        .send({ name: name.trim(), boardId: selectedBoard, order: 1 });
    }
  );
};
const givenBoardHasFollowingColumns = (given) => {
  given(
    "the board contains columns with names and order as following:",
    async (table) => {
      table.forEach(async (row) => {
        const res = await request
          .post("/column")
          .send({ name: row.name.trim(), boardId: selectedBoard, order: 1 })
          .expect(201);
      });
    }
  );
};

const givenBoardHasNoColumns = (given) => {
  given(/^the selected board has no columns$/, async () => {
    const { body } = await request
      .get(`/board/${selectedBoard}/columns`)
      .expect(200);

    expect(body.length).toBe(0);
  });
};

defineFeature(feature, (test) => {
  let columnCreated = false;

  afterEach(() => {
    columnCreated = false;
  });

  test("Successfully add a column with a valid name to an empty board (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardIsSelected(given);
    givenBoardHasNoColumns(given);

    whenUserCreatesColumn(when);

    then(/^the board contains a column with name "(.*)"$/, async (name) => {
      const { body } = await request
        .get(`/board/${selectedBoard}/columns`)
        .expect(200);

      expect(body[0].name).toBe(name);
    });

    then("the board contains one column", async () => {
      const { body } = await request
        .get(`/board/${selectedBoard}/columns`)
        .expect(200);

      expect(body.length).toBe(1);
    });
  });

  test("Successfully add a column with a valid name to a board with existing columns (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardIsSelected(given);
    givenBoardHasNoColumns(given);
    givenBoardHasFollowingColumns(given);
    whenUserCreatesColumn(when);

    then(/^the board contains a column with name "(.*)"$/, async (name) => {
      const { body } = await request
        .get(`/board/${selectedBoard}/columns`)
        .expect(200);

      expect(body[3].name).toBe(name);
    });

    then(/^the board contains 4 columns$/, async () => {
      const { body } = await request
        .get(`/board/${selectedBoard}/columns`)
        .expect(200);

      expect(body.length).toBe(4);
    });

    then(
      "the columns in the board shall have the following names and order:",
      () => {}
    );
  });

  test("Unsuccessfully add a column with an empty name (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardIsSelected(given);
    givenBoardHasNoColumns(given);

    when(
      "the user attempts to create a column without entering a name",
      async () => {
        const { body } = await request
          .post("/column")
          .send({ boardId: selectedBoard })
          .expect(400);
      }
    );

    then(
      "the system shall report that the column name cannot be empty",
      () => {}
    );

    then("the number of columns in the board shall remain zero", async () => {
      const { body } = await request
        .get(`/board/${selectedBoard}/columns`)
        .expect(200);

      expect(body.length).toBe(0);
    });
  });

  test("Unsuccessfully add a column with an invalid name comprising only whitespace (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardIsSelected(given);
    givenBoardHasNoColumns(given);

    whenUserCreatesColumn(when);

    then(
      "the system shall report that the column name cannot be empty",
      () => {}
    );

    then("the number of columns in the board shall remain zero", async () => {
      const { body } = await request
        .get(`/board/${selectedBoard}/columns`)
        .expect(200);

      expect(body.length).toBe(0);
    });
  });

  test("Unsuccessfully add a column with the name of an existing column (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);
    givenUserHasOneBoard(given);
    givenBoardIsSelected(given);
    givenBoardHasNoColumns(given);
    given(/^the board contains a column with name "(.*)"$/, async (name) => {
      const a = await request
        .post("/column")
        .send({ name: name.trim(), boardId: selectedBoard, order: 1 });
    });
    whenUserCreatesColumn(when);

    then(
      /^the system shall report that the column name "(.*)" is already in use$/,
      (name) => {}
    );

    then("the number of columns in the board shall remain one", async () => {
      const { body } = await request
        .get(`/board/${selectedBoard}/columns`)
        .expect(200);
      expect(body.length).toBe(1);
    });

    then(
      "the columns in the board shall have the following names and order:",
      () => {}
    );
  });
});
