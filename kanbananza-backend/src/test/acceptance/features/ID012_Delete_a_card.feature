Feature: Delete a card

    As a user
    I want to be able to delete a card
    So that I can remove obsolete tasks from the board

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
        Given the column with name "Done" has cards with names and order as follows:
            | cardName        | cardOrder |
            | create repo     | 1         |
            | a finished task | 2         |
            | my final task   | 3         |

    Scenario: Delete an existing card at the end of its column (Normal Flow)
        When the user attempts to delete the card with name "my final task"
        Then the column with name "Done" shall have cards with names and orders as follows:
            | cardName        | cardOrder |
            | create repo     | 1         |
            | a finished task | 2         |

    Scenario: Delete an existing card at the middle of its column (Alternate Flow)
        When the user attempts to delete the card with name "a finished task"
        Then the column with name "Done" shall have cards with names and orders as follows:
            | cardName        | cardOrder |
            | create repo     | 1         |
            | my final task | 2           |
