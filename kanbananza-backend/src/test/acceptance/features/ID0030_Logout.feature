Feature: Logout

  As a user
  I want to logout of my account
  So that I can prevent local access to my boards

  Scenario: User successfully logs out of account
    Given a user with email "johnsmith@mail.com" and password "password" exists in the system
    Given user with email "johnsmith@mail.com" is logged in to the system
    When the logged-in user attempts to logout
    Then the user with email "johnsmith@mail.com" shall be logged out of the system
