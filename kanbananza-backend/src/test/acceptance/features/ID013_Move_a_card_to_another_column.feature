Feature: Move a card to another column

    As a user
    I want to be able to move a card between columns
    So that I can manage the stage of that task over its lifetime

    Background:
        Given there exists a user with first name "John", last name "Smith", and email "john.smith@mail.com" in the system
        Given the user with email "john.smith@mail.com" is logged into the system
        Given the user has one board
        Given the user has selected that board
        Given the selected board has three columns ordered as follows:
            | columnName | columnOrder |
            | To Do      | 1           |
            | Doing      | 2           |
            | Done       | 3           |

    Scenario: Move a card to the end of another existing column with existing cards (Normal Flow)
        Given the column with name "Doing" has cards with names and orders as follows:
            | cardName | cardOrder |
            | tests    | 1         |
            | my task  | 2         |
        Given the column with name "Done" has cards with names and order as follows:
            | cardName        | cardOrder |
            | create repo     | 1         |
            | a finished task | 2         |
            | task i did      | 3         |
        When the user attempts to move the card with name "my task" from column with name "Doing" to column with name "Done" at order 4
        Then the column with name "Doing" shall have cards with names and orders as follows:
            | cardName | cardOrder |
            | tests    | 1         |
        Then the column with name "Doing" shall have cards with names and orders as follows:
            | cardName        | cardOrder |
            | create repo     | 1         |
            | a finished task | 2         |
            | task i did      | 3         |
            | my task         | 4         |
        Then the board shall have three columns

    Scenario: Move a card to the middle of another existing column with exisiting cards (Alternate Flow)
        Given the column with name "Doing" has cards with names and orders as follows:
            | cardName | cardOrder |
            | tests    | 1         |
            | my task  | 2         |
        Given the column with name "Done" has cards with names and order as follows:
            | cardName        | cardOrder |
            | create repo     | 1         |
            | a finished task | 2         |
            | task i did      | 3         |
        When the user attempts to move the card with name "my task" from column with name "Doing" to column with name "Done" at order 2
        Then the column with name "Doing" shall have cards with names and orders as follows:
            | cardName | cardOrder |
            | tests    | 1         |
        Then the column with name "Doing" shall have cards with names and orders as follows:
            | cardName        | cardOrder |
            | create repo     | 1         |
            | my task         | 2         |
            | a finished task | 3         |
            | task i did      | 4         |
        Then the board shall have three columns

    Scenario: Move a card to another existing column with no existing cards (Alternate Flow)
        Given the column with name "Doing" has cards with names and orders as follows:
            | cardName | cardOrder |
            | tests    | 1         |
            | my task  | 2         |
        Given the column with name "Done" has no cards
        When the user attempts to move the card with name "my task" from column with name "Doing" to column with name "Done" at order 1
        Then the column with name "Doing" shall have cards with names and orders as follows:
            | cardName | cardOrder |
            | tests    | 1         |
        Then the column with name "Doing" shall have cards with names and orders as follows:
            | cardName | cardOrder |
            | my task  | 1         |
        Then the board shall have three columns
    
    Scenario: Move the only card in a column to another existing column (Alternate Flow)
        Given the column with name "Doing" has no cards
        Given the column with name "Done" has cards with names and orders as follows:
            | cardName        | cardOrder |
            | create repo     | 1         |
            | a finished task | 2         |
            | task i did      | 3         |
        When the user attempts to move the card with name "my task" from column with name "Doing" to column with name "Done" at order 4
        Then the column with name "Doing" shall have no Cards
        Then the column with name "Done" shall have cards with names and orders as follows:
            | cardName        | cardOrder |
            | create repo     | 1         |
            | a finished task | 2         |
            | task i did      | 3         |
            | my task         | 4         |
        Then the board shall have three columns
    
    Scenario: Move a card to a column that does not exist (Error Flow)
        Given the column with name "Doing" has cards with names and orders as follows:
            | cardName | cardOrder |
            | tests    | 1         |
            | my task  | 2         |
        When the user attempts to move the card with name "my task" from column with name "Doing" to column with name "Blocked" at order 3
        Then the system shall report that the column with name "Blocked" does not exist
        Then the column with name "Doing" shall have cards with names and orders as follows:
            | cardName | cardOrder |
            | tests    | 1         |
            | my task  | 2         |
        Then the board shall have three columns

    Scenario: Move a card to another existing column at an invalid negative order (Error Flow)
        Given the column with name "Doing" has cards with names and orders as follows:
            | cardName | cardOrder |
            | tests    | 1         |
            | my task  | 2         |
        Given the column with name "Done" has cards with names and order as follows:
            | cardName        | cardOrder |
            | create repo     | 1         |
            | a finished task | 2         |
            | task i did      | 3         |
        When the user attempts to move the card with name "my task" from column with name "Doing" to column with name "Done" at order -1
        Then the system shall report that the order cannot be negative
        Then the column with name "Doing" shall have cards with names and orders as follows:
            | cardName | cardOrder |
            | tests    | 1         |
            | my task  | 2         |
        Then the column with name "Done" shall have cards with names and orders as follows:
            | cardName        | cardOrder |
            | create repo     | 1         |
            | a finished task | 2         |
            | task i did      | 3         |
        Then the board shall have three columns

        
        



