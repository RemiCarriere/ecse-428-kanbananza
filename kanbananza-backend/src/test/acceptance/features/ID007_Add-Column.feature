Feature: Add a Column

  As a user,
  I want to add a column to my board,
  so that I can add cards to the new column

  Background:
    Given there exists a user with first name "John", last name "Smith", and email "john.smith@mail.com" in the system
    Given the user with email "john.smith@mail.com" is logged into the system
    Given the user has one board
    Given the user has selected that board
    Given the selected board has no columns

  Scenario Outline: Successfully add a column with a valid name to an empty board (Normal Flow)
    When the user attempts to create a column with name "<name>"
    Then the board contains a column with name "<name>"
    And the board contains one column

    Examples:
      | name       |
      | normalName |
      | space name |

  Scenario: Successfully add a column with a valid name to a board with existing columns (Alternate Flow)
    Given the board contains columns with names and order as following:
      | name  | order |
      | To Do | 1     |
      | Doing | 2     |
      | Done  | 3     |
    When the user attempts to create a column with name "Blocked"
    Then the board contains a column with name "Blocked"
    And the board contains 4 columns
    And the columns in the board shall have the following names and order:
      | name    | order |
      | To Do   | 1     |
      | Doing   | 2     |
      | Done    | 3     |
      | Blocked | 4     |

  Scenario: Unsuccessfully add a column with an empty name (Error Flow)
    When the user attempts to create a column without entering a name
    Then the system shall report that the column name cannot be empty
    And the number of columns in the board shall remain zero

  Scenario: Unsuccessfully add a column with an invalid name comprising only whitespace (Error Flow)
    When the user attempts to create a column with name "      "
    Then the system shall report that the column name cannot be empty
    And the number of columns in the board shall remain zero

  Scenario: Unsuccessfully add a column with the name of an existing column (Error Flow)
    Given the board contains a column with name "To Do"
    When the user attempts to create a column with name "To Do"
    Then the system shall report that the column name "To Do" is already in use
    And the number of columns in the board shall remain one
    And the columns in the board shall have the following names and order:
      | columnName | columnOrder |
      | To Do      | 1           |
      | Doing      | 2           |
      | Done       | 3           |
