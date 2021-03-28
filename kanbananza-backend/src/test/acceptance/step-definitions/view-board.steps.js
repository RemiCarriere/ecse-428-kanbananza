import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID034_View_Board.feature"
);
let errMsg = "";
let userID = "";
let selectedBoard = "";




const givenUserHasFollowingBoards = (given) => {
  given(
    "the user has boards with names as following:",
    async (table) => {
    const user = (await request.get("/users")).body[0];
    //const userBoards = (await request.get(/user/${user.id}/boards)).body;
      for (const row of table) {
        await request.post(`/user/${user.id}/boards`).send({
          name: row.boardName,
        });
      }
    }
  );
};

const theUserHasFollowingBoards = (then) => {
    then(
      "the boards with names as following are returned:",
      async (table) => {
      const user = (await request.get("/users")).body[0];
      //const userBoards = (await request.get(/user/${user.id}/boards)).body;
        for (const row of table) {
          await request.post(`/user/${user.id}/boards`).send({
            name: row.boardName,
          });
        }
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

  const givenUserHasNoBoards = (given) => {
    given(/^the user has no boards$/, async () => {
    const user = (await request.get("/users")).body[0];
      const { body } = await request
        .get(`/user/${user.id}/boards`)
        .expect(200);
  
      expect(body.length).toBe(0);
    });
  };


  
  const thenNoBoardsAreReturned = (then) => {
    given(/^no boards are returned$/, async () => {
    const user = (await request.get("/users")).body[0];
      const { body } = await request
        .get(`/user/${user.id}/boards`)
        .expect(200);
  
      expect(body.length).toBe(0);
    });
  };
  

defineFeature(feature, (test) => {
  test("View boards of a user with multiple boards (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenUserExists(given);
    givenExistsUser(given);
    givenUserHasFollowingBoards(given);
    //when the users attemps to view their board. TO DO  
    theUserHasFollowingBoards(then);

    });

  test("View boards of a new user with no boards (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    givenUserExists(given);
    givenExistsUser(given);
    givenUserHasNoBoards(given); 
    //when the users attempts to view their board. TO DO
    thenNoBoardsAreReturned(then);
  });
});