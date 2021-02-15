Feature: Create an Account

  As a User,
  I want to create an account,
  so that I can make use of the Kanban capabilities of the system

  Scenario: Successfully create an account with a valid and unused email (Normal Flow)
    Given an account with email "johnsmith@mail.com" does not exist in the system
    When the user attempts to create an account with name "john smith", email "johnsmith@mail.com", and password "password"
    Then an account with name "john smith", email "johnsmith@mail.com", and password "password" shall exist in the system
    Then the number of accounts in the system shall increase by one

  Scenario: Unsuccessfully create an account with a valid but existing email (Error Flow)
    Given an account with email "johnsmith@mail.com" exists in the system
    When the user attempts to create an account with email "johnsmith@mail.com"
    Then the system shall report that the email is already in use
    Then an account with email "johnsmith@mail.com" shall exist in the system
    Then the number of accounts shall remain the same

  Scenario: Unsuccessfully create an account with an invalid yet unused email (Error Flow)
    Given there exist no accounts in the system
    When the user attempts to create an account with email "<email>"
    Then the system shall report that the email is invalid
    Then an account with email "johnsmith@mail.com" shall not exist in the system
    Then the number of accounts shall remain zero