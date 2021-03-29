Feature: Set the Priority for a Card

Background:
Given user with username Fizbin is logged into the system
Given the user has one board
Given the user has selected that board
Given the board has one column with name "Doing"
Given that column has one and only one card with name "Project Presentation"

Scenario Outline: Set a priority for a card with no priority (Normal Flow)
Given the card with name "Project Presentation" does not have a priority set
When the user sets the priority of the card with name "Project Presentation" to <priority>
Then the card with name "Project Presentation" has priority <priority>

Examples:
| priority |
| Low      |
| Medium   |
| High     |

Scenario: Set a priority for a card with an existing priority (Alternate Flow)
Given the card with name "Project Presentation" has priority "Low"
When the user sets the priority of the card with name "Project Presentation" to "High"
Then the card with name "Project Presentation" has priority "High"
