Feature: Create a board

  As a user
  I want to create a new Kanban board,
  So that I can use the board to manage a project

  Background:
    Given there exists a user with first name "John", last name "Smith", and email "john.smith@mail.com" in the system
    Given the user with email "john.smith@mail.com" is logged into the system

  Scenario: Successfully create a board with a valid board name (Normal Flow)
    Given the user has no existing boards with name "Project Preparation"
    When the user attempts to create a new board with name "Project Preparation"
    Then the user shall have a board with name "Project Preparation"
    And the user shall be authorized to view the board with name "Project Preparation"
    And the number of boards the user has shall increase by one

  Scenario: Unsuccessfully create a board with a valid but existing name (Error Flow)
    Given the user has an existing board with name "Project Preparation"
    When the user attempts to create a new board with name "Project Preparation"
    Then the system shall report that the board name "Project Preparation" is already in use
    And the user shall have a board with name "Project Preparation"
    And the user shall be authorized to view the board with name "Project Preparation"
    And the number of boards the user has shall remain the same

  Scenario: Unsuccessfully create a board with an invalid name comprising only whitespace (Error Flow)
    Given the user has no existing boards
    When the user attempts to create a new board with name "      "
    Then the system shall report that the board name cannot be empty
    And the user shall not have a board with name "      "
    And the number of boards the user has shall remain zero
