Feature: Select a board

    As a user
    I want to be able to select one of my boards
    so that I can view the organized tasks for a project

    Background:
        Given there exists a user with first name "John", last name "Smith", and email "john.smith@mail.com" in the system
        Given the user with email "john.smith@mail.com" is logged into the system

    Scenario: Select a board that is owned by the user (Normal Flow)
        Given the user with email "john.smith@mail.com" has a board with name "My Board"
        Given the board with name "My Board" contains columns with names and order as following:
            | name  | order |
            | To Do | 1     |
            | Doing | 2     |
            | Done  | 3     |
        Given the user with email "john.smith@mail.com" has a board with name "My Other Board"
        Given the board with name "My Other Board" contains columns with names and order as following:
            | name        | order |
            | some column | 1     |
            | qa ready    | 2     |
        When the user attempts to select the board with name "My Board"
        Then the selected board will have the name "My Board"
        Then the selected board will have the following columns:
            | name  | order |
            | To Do | 1     |
            | Doing | 2     |
            | Done  | 3     |

    Scenario: Select a board that is owned by another user (Error Flow)
        Given the user with email "john.smith@mail.com" has a board with name "My Board"
        Given the board with name "My Board" contains columns with names and order as following:
            | name  | order |
            | To Do | 1     |
            | Doing | 2     |
            | Done  | 3     |
        Given there exists a user with first name "Jane", last name "Doe", and email "jane.doe@mail.com" in the system
        Given the user with email "jane.doe@mail.com" has a board with name "Not Your Board"
        Given the board with name "Not Your Board" contains columns with names and order as following:
            | name        | order |
            | some column | 1     |
            | qa ready    | 2     |
        When the user attempts to select the board with name "Not Your Board"
        Then there shall be no selected board
        Then the system shall report that the user is not authorized to select the board