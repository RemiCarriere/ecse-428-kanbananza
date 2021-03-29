Feature: View boards

    As a user
    I want to be able to view my boards
    So that I can have an overview of my managed projects

    Background:
        Given there exists a user with first name "John", last name "Smith", and email "john.smith@mail.com" in the system
        Given the user with email "john.smith@mail.com" is logged into the system

    Scenario: View boards of a user with multiple boards (Normal Flow)
        Given the user has boards with names as following:
            | boardName             |
            | my first board        |
            | another board         |
            | bard name withh typos |
        When the user attempts to view their boards
        Then the boards with names as following are returned:
            | boardName             |
            | my first board        |
            | another board         |
            | bard name withh typos |
        
    Scenario: View boards of a new user with no boards (Alternate Flow)
        Given the user has no boards
        When the user attempts to view their boards
        Then no boards are returned