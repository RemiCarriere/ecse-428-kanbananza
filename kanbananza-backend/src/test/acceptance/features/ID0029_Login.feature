Feature: Login

  As a user,
  I want to login to my account,
  so that I can access my boards

  Scenario: User successfully logs in to account successfully (Normal Flow)
    Given a user with email "johnsmith@mail.com" and password "password" exists in the system
    When the user attempts to login with email "johnsmith@mail.com" and password "password"
    Then the user with email "johnsmith@mail.com" shall be logged into the system

  Scenario: User unsuccessfully logs in with incorrect password for the given email (Error Flow)
    Given a user with email "johnsmith@mail.com" and password "password" exists in the system
    When the user attempts to login with email "johnsmith@mail.com" and password "wrong password"
    Then the system shall report "Password is incorrect"
    And the user with email "johnsmith@mail.com" shall not be logged into the system
