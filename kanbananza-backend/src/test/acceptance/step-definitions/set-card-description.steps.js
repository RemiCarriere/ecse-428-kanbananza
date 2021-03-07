import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID033_Set_the_description_for_a_card.feature"
);
const errMsg = "";
let responseStatus = "";
let userID = "";
let selectedBoard = "";
let colID = "";

const givenFizBinLoggedIn = (given) => {
  given("user with username Fizbin is logged into the system", async () => {
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

const givenBoardHasColumnWithName = (given) => {
  given(/^the board has one column with name "(.*)"$/, async (colName) => {
    const res = await request
      .post("/column")
      .send({ name: colName, boardId: selectedBoard, order: 1 });
    colID = res.body.id;
  });
};

const givenColumnHasOneCardWithName = (given) => {
  given(
    /^that column has one and only one card with name "(.*)"$/,
    async (colName, name) => {
      const { body } = await request.get(`/column/${colID}/cards`).expect(200);

      expect(body[0].name).toBe(name);
    }
  );
};

const givenCardShallHaveThatDescription = (given) => {
  given(
    /^the card with name "(.*)" has a description "(.*)"$/,
    async (cardName, cardDescription) => {
      const { body } = await request
        .get(`/column/${colID}/cards/`) //I think this has an error
        .expect(200);

      expect(body[0].description).toBe(cardDescription);
    }
  );
};

const givenCardHasNullDescription = (given) => {
  //Check that, could have an error here
  given(
    /^the card with name "(.*)" does not have a description$/,
    async (cardName, NULL) => {
      const { body } = await request
        .get(`/column/${colID}/cards/`) //I think this has an error
        .expect(200);

      expect(body[0].description).toBe(NULL);
    }
  );
};

const whenUserSetsDescriptionOfCard = (when) => {
  when(
    /^the user sets the priority of card with name "(.*)" to "(.*)"$/,
    async (cardName, cardDescription) => {
      const res = await request
        .put("/card") //should you use put here? How do you get the specific card with cardName??
        .set({ description: cardDescription });
    }
  );
};

//Should that be different than the one above? Two methods practically the same, one with given and the other with then
const thenCardShallHaveThatDescription = (then) => {
  then(
    /^the card with name "(.*)" has description "(.*)"$/,
    async (cardName, cardDescription) => {
      const { body } = await request
        .get(`/column/${colID}/cards/`) //I think this has an error
        .expect(200);

      expect(body[0].description).toBe(cardDescription);
    }
  );
};

defineFeature(feature, (test) => {
  test("Set a valid description for a card with an existing description (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    givenFizBinLoggedIn(given); //Remy

    givenUserHasOneBoard(given); //Remy

    givenBoardSelected(given); // Remy

    givenBoardHasColumnWithName(given); // Remy

    givenColumnHasOneCardWithName(given); //I implemented this

    givenCardShallHaveThatDescription(given); // I implemented this

    whenUserSetsDescriptionOfCard(when); // I implemented this

    thenCardShallHaveThatDescription(then); //I implemented this
  });

  test("Set the description for a card with no description to whitespace (Error Flow)", ({
    given,
    when,
    then,
  }) => {
    givenFizBinLoggedIn(given); //Took it from previous files

    givenUserHasOneBoard(given); //Took it from previous files

    givenBoardSelected(given); //Took it from previous files

    givenBoardHasColumnWithName(given); //Took it from previous files

    givenColumnHasOneCardWithName(given); //I implemented this

    givenCardShallHaveThatDescription(given);

    whenUserSetsDescriptionOfCard(when);

    then(/^a message "(.*)" is issued$/, (arg0) => {}); //Do that part.

    thenCardShallHaveThatDescription(then); //I implemented this
  });

  test("Set a valid description for a card with no description (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    givenFizBinLoggedIn(given);

    givenUserHasOneBoard(given);

    givenBoardSelected(given);

    givenBoardHasColumnWithName(given);

    givenColumnHasOneCardWithName(given); //I implemented this

    givenCardHasNullDescription(given); //I implemented this. Check for errors.

    whenUserSetsDescriptionOfCard(when); // I implemented this. Check for errors.

    thenCardShallHaveThatDescription(then); //I implemented this. Check for errors.
  });
});
