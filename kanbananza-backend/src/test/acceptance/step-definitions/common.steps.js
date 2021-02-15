export const givenUserLoggedIn = (given) => {
  given(/^the user with email "(.*)" is logged into the system$/, (arg0) => {});
};

export const givenExistsUser = (given) => {
  given(
    /^there exists a user with first name "(.*)", last name "(.*)", and email "(.*)" in the system$/,
    (arg0, arg1, arg2) => {}
  );
};
