Feature: Update the name of a board

    As a user
    I want to be able to update the name of one of my boards
    So that I can reflect name changes to my project
    Or so that I can fix mistakes

    Background:
        Given there exists a user with first name "John", last name "Smith", and email "john.smith@mail.com" in the system
        Given the user with email "john.smith@mail.com" is logged into the system

    Scenario: Update the name of the user's only board to a new valid name (Normal Flow)
        Given the user has only one board with name "My Board Name"
        When the user attempts to update the name of the board with name "My Board Name" to "My New Board Name"
        Then the user shall have a board with name "My New Board Name"
        Then the user shall have one board

    Scenario: Update the name of one of the user's boards to a new valid name (Alternate Flow)
        Given the user has boards with names as following:
            | boardName             |
            | my first board        |
            | another board         |
            | bard name withh typos |
        When the user attempts to update the name of the board with name "bard name withh typos" to "board name without typos"
        Then the user shall have boards with names as following:
            | boardName                |
            | my first board           |
            | another board            |
            | board name without typos |
        Then the user shall have three boards

    Scenario: Update the name of a board to the same name (Alternate Flow)
        Given the user has only one board with name "My Board Name"
        When the user attempts to update the name of the board with name "My Board Name" to "My Board Name"
        Then the user shall have a board with name "My Board Name"
        Then the user shall have one board

    Scenario: Update the name of a board to a new invalid name comprising only whitespace (Error Flow)
        Given the user has only one board with name "My Board Name"
        When the user attempts to update the name of the board with name "My Board Name" to "           "
        Then the system shall report that the board name cannot be empty
        Then the user shall have a board with name "My Board Name"
        Then the user shall have one board
