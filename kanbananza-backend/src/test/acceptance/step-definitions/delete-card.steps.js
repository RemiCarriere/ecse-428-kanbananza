import { defineFeature, loadFeature } from "jest-cucumber";
import card from "../../../main/models/card";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID012_Delete_a_cardfeature"
);
let errMsg = "";
let userID = "";
let selectedBoard = "";


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


const givenColumnHasFollowingCards = (then) => {
    then(
        /^the column with name "(.*)" has cards with names and order as follows:$/,
      async (colName, table) => {
        const res = await request.get(`/board/${selectedBoard}/columns`);
        let colId = res.body.filter((column) => column.name === colName)[0];
        for (const row of table) {
          await request.post("/column/${colID}/cards").send({
            name: row.cardName,
            columnId: colID,
            order: parseInt(row.cardOrder),
          });
        }
      }
    );
  };


const whenUserAttemptsToDeleteCard = (when) => {
    when(
      /^the user attempts to delete card with name "(.*)"$/,
      async (colName,cardName) => {
        const res = await request.get(`/board/${selectedBoard}/columns`);
        let colId = res.body.filter((column) => column.name === colName)[0];

        const res2 = await request.get(`/column/${colID}/cards`);
        let cardId = res2.body.filter((card) => card.cardName === cardName)[0];
        if (cardId) {
          cardId = cardId.id;
        } else {
          cardId = "non-existent card";
        }
        const res1 = await request.delete(`/column/${colID}/cards/${cardId}`);
        if (res1.body) {
          errMsg = res1.body.errors;
        }
      }
    );
  };


  const thenColumnHasFollowingCards = (then) => {
    then(
        /^the column with name "(.*)" shall have cards with names and orders as follows:$/,
      async (colName, table) => {
        const res = await request.get(`/board/${selectedBoard}/columns`);
        let colId = res.body.filter((column) => column.name === colName)[0];
        for (const row of table) {
          await request.post("/column/${colID}/cards").send({
            name: row.cardName,
            columnId: colID,
            order: parseInt(row.cardOrder),
          });
        }
      }
    );
  };


defineFeature(feature, (test) => {
  test("Delete an existing card at the end of its column (Normal Flow)", ({
    when,
    then,
  }) => {
    givenUserExists(given);
    givenExistsUser(given);
    givenUserHasOneBoard(given);
    givenBoardSelected(given);
    givenBoardHasFollowingColumns(given); 
    // add the last given 
    whenUserAttemptsToDeleteCard(when);
    thenColumnHasFollowingCards(then);

  });

  test("Delete an existing card at the middle of its column (Alternate Flow)", ({
    when,
    then,
  }) => {
    givenUserExists(given);
    givenExistsUser(given);
    givenUserHasOneBoard(given);
    givenBoardSelected(given);
    givenBoardHasFollowingColumns(given); 
    // add the last given 
    whenUserAttemptsToDeleteCard(when);
    thenColumnHasFollowingCards(then);
  });
});