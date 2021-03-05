Feature: Set the description for a card

Background:
Given user with username Fizbin is logged into the system
Given the user has one board
Given the user has selected that board
Given the board has one column with name "Doing"
Given that column has one and only one card with name "Project Presentation"

Scenario Outline: Set a valid description for a card with no description (Normal Flow)
Given the card with name "Project Presentation" does not have a description
When the user sets the description of the card with name "Project Presentation" to "<description>"
Then the card with name "Project Presentation" has description "<description>"

Examples:
| description |
| word        |
| some words  |
| numb3r5     |
| 3%~$16.90?  |

Scenario: Set a valid description for a card with an existing description (Alternate Flow)
Given the card with name "Project Presentation" has a description "Initial card description"
When the user sets the description of the card with name "Project Presentation" to "Updated info"
Then the card with name "Project Presentation" has description "Updated info"

Scenario: Set the description for a card with no description to whitespace (Error Flow)
Given the card with name "Project Presentation" has a description "Initial card description"
When the user sets the description of the card with name "Project Presentation" to "      "
Then a message "Description cannot be empty" is issued
Then the card with name "Project Presentation" has description "Initial card description"


