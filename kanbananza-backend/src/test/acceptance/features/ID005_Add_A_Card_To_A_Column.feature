Feature: Add a card to a column

  As a user,
  I want to be able to add a card to a board,
  so that I can track the tasks of a project

  Background:
    Given there exists a user with first name "John", last name "Smith", and email "john.smith@mail.com" in the system
    Given the user with email "john.smith@mail.com" is logged into the system
    Given the user has one board
    Given the user has selected that board
    Given the board has one column with name "Doing"

  Scenario Outline: Successfully add a card with a valid name to an existing column (Normal Flow)
    Given the column with name "Doing" does not include an existing card with name "<name>"
    When the user attempts to add a card with name "<name>" to the column with name "Doing"
    Then one card with name "<name>" shall be included in the column with name "Doing"
    And the number of cards included in the column with name "Doing" shall increase by one
    And the number of cards in the board shall increase by one

      | name                 |
      | Project Presentation |
      | my task 1            |

  Scenario: Successfully add a card with a valid but existing name to an existing column (Alternate Flow)
    Given the column with name "Doing" includes an existing card with name "Repetitive Task"
    When the user attempts to add a card with name "Repetitive Task" to the column with name "Doing"
    Then two cards with name "Repetitive Task" shall be included in the column with name "Doing"
    And the number of cards included in the column with name "Doing" shall increase by one
    And the number of cards in the board shall increase by one

  Scenario: Unsuccessfully add a card with an invalid name comprising only whitespace to an existing column (Error Flow)
    Given the column with name "Doing" includes no existing cards
    When the user attempts to add a card with name "     " to the column with name "Doing"
    Then the system shall report "Card name cannot be empty"
    And a card with name "     " shall not be included in the column with name "Doing"
    And the number of cards included in the column with name "Doing" shall remain zero
    And the number of cards in the board shall remain the same
