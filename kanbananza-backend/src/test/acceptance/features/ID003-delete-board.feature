Feature: 003 - Delete a Board

As a user I want to be able to delete a board
Background:
Given user with username Fizbin is logged in
Given the user has one board with name "Test Board" 


Scenario: Delete the board (Normal Flow)
When the user attempts to delete column with name "Test Board"
Then the user won't have any more boards

Scenario: Delete board that does not exist (Error Flow)
When the user attempts to delete a board with non existant name
Then the user will still have one board with name "Test Board"


