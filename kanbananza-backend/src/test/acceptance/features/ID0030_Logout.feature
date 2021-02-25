Feature: Logout

  As a user,
  I want to logout of my account,
  so that I can prevent local access to my boards

  Scenario: User successfully logs out of account
    Given there exists a user with first name "John", last name "Smith", email "john.smith@mail.com", and password "pass1234" in the system
    Given the user with email "johnsmith@mail.com" is logged into the system
    When the user attempts to logout
    Then the user with email "johnsmith@mail.com" shall be logged out of the system
