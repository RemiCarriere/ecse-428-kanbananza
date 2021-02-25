Feature: Login

  As a user,
  I want to login to my account,
  so that I can access my boards

  Scenario: User successfully logs in to account successfully (Normal Flow)
    Given there exists a user with first name "John", last name "Smith", email "john.smith@mail.com", and password "pass1234" in the system
    When the user attempts to login with email "john.smith@mail.com" and password "pass1234"
    Then the user with email "johnsmith@mail.com" shall be logged into the system

  Scenario: User unsuccessfully logs in with incorrect password for the given email (Error Flow)
    Given there exists a user with first name "John", last name "Smith", email "john.smith@mail.com", and password "pass1234" in the system
    When the user attempts to login with email "john.smith@mail.com" and password "wrong password"
    Then the system shall report that the password is incorrect
    And the user with email "johnsmith@mail.com" shall not be logged into the system
