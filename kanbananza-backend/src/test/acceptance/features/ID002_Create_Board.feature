Feature: Create a board

  As a user
  I want to create a new Kanban board
  So that I can use the board to manage a project

  Background:
    Given user "John Smith" is logged into the system

  Scenario: Successfully create a board with a valid board name (Normal Flow)
    Given the logged-in user has no existing boards with name "Project Preparation"
    When the logged-in user attempts to create a new board with name "Project Preparation"
    Then the logged-in user shall have a board with name "Project Prepation"
    And the logged-in user shall be authorized to view the board with name "Project Preparation"
    And the number of boards the logged-in user has shall increase by one

  Scenario: Unsuccessfully create a board with a valid but existing name (Error Flow)
    Given the logged-in user has an existing board with name "Project Preparation"
    When the logged-in user attempts to create a new board with name "Project Preparation"
    Then the system shall report "Board name 'Project Preparation' is already in use"
    And the logged-in user shall have a board with name "Project Prepation"
    And the logged-in user shall be authorized to view the board with name "Project Preparation"
    And the number of boards the logged-in user has shall remain the same

  Scenario: Unsuccessfully create a board with an invalid name comprising only whitespace (Error Flow)
    Given the logged-in user has no existing boards
    When the logged-in user attempts to create a new board with name "      "
    Then the system shall report "Board name cannot be empty"
    And the logged-in user shall not have a board with name "      "
    And the number of boards the logged-in user has shall remain zero
