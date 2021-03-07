import { defineFeature, loadFeature } from "jest-cucumber";
import request from "../../support/request";

const feature = loadFeature(
  "src/test/acceptance/features/ID032_Set_the_priority_for_a_card.feature"
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
  given("the user has selected that board", async () => {
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

const givenCardShallHaveThatPriority = (given) => {
  given(
    /^the card with name "(.*)" has priority "(.*)"$/,
    async (cardName, cardPriority) => {
      const { body } = await request
        .get(`/column/${colID}/cards/`) //I think this has an error
        .expect(200);

      expect(body[0].priority).toBe(cardPriority);
    }
  );
};

const whenUserSetsPriorityOfCard = (when) => {
  when(
    /^the user sets the priority of the card with name "(.*)" to (.*)$/,
    async (cardName, cardPriority) => {
      const res = await request
        .put("/card") //should you use put here? How do you get the specific card with cardName??
        .set({ priority: cardPriority });
    }
  );
};

//Should that be different than the one above? Two methods practically the same, one with given and the other with then
const thenCardShallHaveThatPriority = (then) => {
  then(
    /^the card with name "(.*)" has priority "(.*)"$/,
    async (cardName, cardPriority) => {
      const { body } = await request
        .get(`/column/${colID}/cards/`) //I think this has an error
        .expect(200);

      expect(body[0].priority).toBe(cardPriority);
    }
  );
};

const givenCardHasNullPriority = (given) => {
  //Check that, could have an error here
  given(
    /^the card with name "(.*)" does not have a priority set$/,
    async (cardName, NULL) => {
      const { body } = await request
        .get(`/column/${colID}/cards/`) //I think this has an error
        .expect(200);

      expect(body[0].priority).toBe(NULL);
    }
  );
};
//TODO: Implement the step definitions and remove .skip
defineFeature(feature, (test) => {
  test.skip("Set a priority for a card with an existing priority (Alternate Flow)", ({
    given,
    when,
    then,
  }) => {
    given("user with username Fizbin is logged into the system", () => {});

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(/^the board has one column with name "(.*)"$/, (arg0) => {});

    given(
      /^that column has one and only one card with name "(.*)"$/,
      (arg0) => {}
    );

    given(
      /^the card with name "(.*)" has priority "(.*)"$/,
      (arg0, arg1) => {}
    );

    when(
      /^the user sets the priority of card with name "(.*)" to "(.*)"$/,
      (arg0, arg1) => {}
    );

    then(/^the card with name "(.*)" has priority "(.*)"$/, (arg0, arg1) => {});
  });

  test.skip("Set a priority for a card with no priority (Normal Flow)", ({
    given,
    when,
    then,
  }) => {
    given("user with username Fizbin is logged into the system", () => {});

    given("the user has one board", () => {});

    given("the user has selected that board", () => {});

    given(/^the board has one column with name "(.*)"$/, (arg0) => {});

    given(
      /^that column has one and only one card with name "(.*)"$/,
      (arg0) => {}
    );

    given(
      /^the card with name "(.*)" does not have a priority set$/,
      (arg0) => {}
    );

    when(
      /^the user sets the priority of the card with name "(.*)" to (.*)$/,
      (arg0, arg1) => {}
    );

    then(/^the card with name "(.*)" has priority (.*)$/, (arg0, arg1) => {});
  });
});
