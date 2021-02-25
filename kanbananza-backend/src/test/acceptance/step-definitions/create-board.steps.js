import { defineFeature, loadFeature } from "jest-cucumber";
import { givenUserLoggedIn, givenExistsUser } from "./shared-steps";
import request from "../../support/request";

let boardCount;
let response;
const feature = loadFeature(
  "src/test/acceptance/features/ID002_Create_Board.feature"
);

const whenUserCreatesBoardWithName = (when) => {
  when(
    /^the user attempts to create a new board with name "(.*)"$/,
    async (name) => {
      const user = (await request.get("/users")).body[0];
      boardCount = (await request.get(`/user/${user.id}/boards`)).body.length;
      response = await request.post("/board").send({ ownerId: user.id, name });
    }
  );
};

const userShallHaveBoardWithName = (then) => {
  then(/^the user shall have a board with name "(.*)"$/, async (name) => {
    const user = (await request.get("/users")).body[0];
    const userBoards = (await request.get(`/user/${user.id}/boards`)).body;

    expect(userBoards.filter((board) => board.name === name).length).toBe(1);
  });
};

defineFeature(feature, (test) => {
  test("Successfully create a board with a valid board name (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);

    given(
      /^the user has no existing boards with name "(.*)"$/,
      async (name) => {
        const user = (await request.get("/users")).body[0];
        const userBoards = (await request.get(`/user/${user.id}/boards`)).body;
        for (const board of userBoards) {
          if (board.name === name) {
            await request.delete(`/board/${board.id}`);
          }
        }
      }
    );

    whenUserCreatesBoardWithName(when);

    userShallHaveBoardWithName(then);

    then(
      /^the user shall be authorized to view the board with name "(.*)"$/,
      async (name) => {
        const user = (await request.get("/users")).body[0];
        const userBoards = (await request.get(`/user/${user.id}/boards`)).body;

        expect(userBoards.filter((board) => board.name === name).length).toBe(
          1
        );
      }
    );

    then(
      "the number of boards the user has shall increase by one",
      async () => {
        const user = (await request.get("/users")).body[0];
        const userBoards = (await request.get(`/user/${user.id}/boards`)).body;

        expect(userBoards.length).toBe(boardCount + 1);
      }
    );
  });

  test("Unsuccessfully create a board with a valid but existing name (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);

    given(/^the user has an existing board with name "(.*)"$/, async (name) => {
      const user = (await request.get("/users")).body[0];
      const userBoards = (await request.get(`/user/${user.id}/boards`)).body;
      // const userBoardsWithName = filter((board) => board.name === name);
      for (const board of userBoards) {
        if (board.name === name) {
          await request.delete(`/board/${board.id}`);
        }
      }

      await request.post("/board").send({ name, ownerId: user.id });
    });

    whenUserCreatesBoardWithName(when);

    then(
      /^the system shall report that the board name "(.*)" is already in use$/,
      (name) => {}
    );

    userShallHaveBoardWithName(then);

    then(
      /^the user shall be authorized to view the board with name "(.*)"$/,
      async (name) => {
        const user = (await request.get("/users")).body[0];
        const userBoards = (await request.get(`/user/${user.id}/boards`)).body;

        expect(userBoards.filter((board) => board.name === name).length).toBe(
          1
        );
      }
    );

    then(
      "the number of boards the user has shall remain the same",
      async () => {
        const user = (await request.get("/users")).body[0];
        const userBoards = (await request.get(`/user/${user.id}/boards`)).body;

        expect(userBoards.length).toBe(boardCount);
      }
    );
  });

  test("Unsuccessfully create a board with an invalid name comprising only whitespace (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenExistsUser(given);
    givenUserLoggedIn(given);

    given(/^the user has no existing boards$/, async () => {
      const user = (await request.get("/users")).body[0];
      const userBoards = (await request.get(`/user/${user.id}/boards`)).body;
      // const userBoardsWithName = filter((board) => board.name === name);
      for (const board of userBoards) {
        await request.delete(`/board/${board.id}`);
      }
    });

    whenUserCreatesBoardWithName(when);

    then("the system shall report that the board name cannot be empty", () => {
      expect(response.status).toBe(400);
    });

    then(/^the user shall not have a board with name "(.*)"$/, async (name) => {
      const user = (await request.get("/users")).body[0];
      const userBoards = (await request.get(`/user/${user.id}/boards`)).body;
      expect(userBoards.filter((board) => board.name === name).length).toBe(0);
    });

    then("the number of boards the user has shall remain zero", async () => {
      const user = (await request.get("/users")).body[0];
      const userBoards = (await request.get(`/user/${user.id}/boards`)).body;
      expect(userBoards.length).toBe(0);
    });
  });
});
