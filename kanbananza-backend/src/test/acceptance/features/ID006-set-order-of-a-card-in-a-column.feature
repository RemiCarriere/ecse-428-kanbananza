Feature: 006 - Set the order of card in a column

    As a user
    I want to be able to set the order of card in a column
    so that I can manually prioritize cards

    Background:
        Given user with username Fizbin is logged in
        Given the user owns one board
        Given the user has selected that board
        Given the selected board has one column with two cards ordered as follows:
            | columnName | Cards      | CardIndex |
            | TODO       | Card One   | 1         |
            | TODO       | Card Two   | 2         |
            | TODO       | Card Three | 3         |


    Scenario: Move the card in the board (Normal Flow)
        When the user attempts to move card with name "Card Two" to index 1
        Then the board will look as follows:
            | columnName | Cards      | CardIndex |
            | TODO       | Card One   | 2         |
            | TODO       | Card Two   | 1         |
            | TODO       | Card Three | 3         |

    Scenario: Move a card to the same position (Alternate Flow)
        When the user attempts to move card with name "Card One" to index 1
        Then the board will look as follows:
            | columnName | Cards    | CardIndex |
            | TODO       | Card One | 1         |
            | TODO       | Card Two | 2         |

    Scenario: Move a non-existent card (Error Flow)
        When the user attempts to move card with name "Card seven" to index 1
        Then the system shall report "Card seven does not exist"




