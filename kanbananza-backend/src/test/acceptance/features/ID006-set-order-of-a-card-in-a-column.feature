Feature: 006 - Set the order of card in a column

As a user I want to be able to set the order of card in a board 
Background:
Given user with username Fizbin is logged in
Given the user owns one board
Given the user has selected that board
Given the selected board has one column with two cards ordered as follow
| columnName       | Cards              |CardIndex |
|      Column one  | Card One           | 1		   |
|                  | Card Two           | 2        |


Scenario: Move the card in the board (Normal Flow)
When the user attempts to swap card with index <card> with card at index <otherCard>
| card       | otherCard       |
| 1          | 2               |

Then the board will look as follow

| columnName       | Cards              |CardIndex |
|      Column one  | Card Two           | 1		   |
|                  | Card One           | 2        |

Scenario:  Move a card to the same position (Alternate Flow)
When the user attempts to the user attempts to swap card with index <card> with card at index <otherCard>

| card       | otherCard       |
| 1          | 1               |

Then the board is unchanged
| columnName       | Cards              |CardIndex |
|      Column one  | Card One           | 1		   |
|                  | Card Two           | 2        |


Scenario: Move a card outside the board (Error Flow)
When the user attempts to move a card outside the board
Then an error "You can't move a card outside the board" is issued





